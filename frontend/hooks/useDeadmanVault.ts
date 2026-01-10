import { useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { DeadmanVaultABI } from "@/lib/abi/DeadmanVault";
import type { Address } from "viem";
import { parseEther } from "viem";

export interface VaultState {
  owner: Address;
  beneficiary: Address;
  lastPing: bigint;
  timeout: bigint;
  hasClaimed: boolean;
  balance: bigint;
}

/**
 * Hook for interacting with a specific DeadmanVault instance
 */
export function useDeadmanVault(vaultAddress?: Address) {
  // Write functions
  const { writeContract, data: hash, isPending, isSuccess, error } = useWriteContract();

  /**
   * Deposit ETH into the vault
   * @param amount - Amount in ETH (will be converted to wei)
   */
  const deposit = async (amount: string) => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "deposit",
      value: parseEther(amount),
    });
  };

  /**
   * Withdraw ETH from the vault (owner only)
   * @param amount - Amount in wei
   */
  const withdraw = async (amount: bigint) => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "withdraw",
      args: [amount],
    });
  };

  /**
   * Ping the vault to reset the deadman timer (owner only)
   */
  const ping = async () => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "ping",
    });
  };

  /**
   * Set a new beneficiary (owner only)
   * @param newBeneficiary - Address of the new beneficiary
   */
  const setBeneficiary = async (newBeneficiary: Address) => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "setBeneficiary",
      args: [newBeneficiary],
    });
  };

  /**
   * Set a new timeout period (owner only)
   * @param newTimeout - Timeout in seconds
   */
  const setTimeout = async (newTimeout: bigint) => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "setTimeout",
      args: [newTimeout],
    });
  };

  /**
   * Claim all funds from the vault (beneficiary only, after timeout)
   */
  const claimAll = async () => {
    if (!vaultAddress) throw new Error("Vault address is required");
    
    return writeContract({
      address: vaultAddress,
      abi: DeadmanVaultABI,
      functionName: "claimAll",
    });
  };

  return {
    deposit,
    withdraw,
    ping,
    setBeneficiary,
    setTimeout,
    claimAll,
    hash,
    isPending,
    isSuccess,
    error,
  };
}

/**
 * Hook to get the complete vault state
 */
export function useVaultState(vaultAddress?: Address) {
  const { data: vaultState, isLoading, error, refetch } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "getVaultState",
    query: {
      enabled: !!vaultAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  return {
    vaultState: vaultState as VaultState | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to check if timeout has been reached
 */
export function useIsTimeoutReached(vaultAddress?: Address) {
  const { data: isTimeoutReached, isLoading, error } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "isTimeoutReached",
    query: {
      enabled: !!vaultAddress,
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  return {
    isTimeoutReached: isTimeoutReached as boolean | undefined,
    isLoading,
    error,
  };
}

/**
 * Hook to get vault balance
 */
export function useVaultBalance(vaultAddress?: Address) {
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "getBalance",
    query: {
      enabled: !!vaultAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });

  return {
    balance: balance as bigint | undefined,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get timeout constants
 */
export function useVaultTimeoutLimits(vaultAddress?: Address) {
  const { data: minTimeout } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "MIN_TIMEOUT",
    query: {
      enabled: !!vaultAddress,
    },
  });

  const { data: maxTimeout } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "MAX_TIMEOUT",
    query: {
      enabled: !!vaultAddress,
    },
  });

  const { data: defaultTimeout } = useReadContract({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    functionName: "DEFAULT_TIMEOUT",
    query: {
      enabled: !!vaultAddress,
    },
  });

  return {
    minTimeout: minTimeout as bigint | undefined,
    maxTimeout: maxTimeout as bigint | undefined,
    defaultTimeout: defaultTimeout as bigint | undefined,
  };
}

/**
 * Hook to watch for vault events
 */
export function useWatchVaultEvents(
  vaultAddress?: Address,
  callbacks?: {
    onDeposit?: (owner: Address, amount: bigint) => void;
    onWithdraw?: (owner: Address, amount: bigint) => void;
    onPing?: (owner: Address, timestamp: bigint) => void;
    onClaim?: (beneficiary: Address, amount: bigint) => void;
  }
) {
  // Watch Deposited events
  useWatchContractEvent({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    eventName: "Deposited",
    enabled: !!vaultAddress && !!callbacks?.onDeposit,
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.owner && log.args.amount !== undefined) {
          callbacks?.onDeposit?.(log.args.owner, log.args.amount);
        }
      });
    },
  });

  // Watch Withdrawn events
  useWatchContractEvent({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    eventName: "Withdrawn",
    enabled: !!vaultAddress && !!callbacks?.onWithdraw,
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.owner && log.args.amount !== undefined) {
          callbacks?.onWithdraw?.(log.args.owner, log.args.amount);
        }
      });
    },
  });

  // Watch Pinged events
  useWatchContractEvent({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    eventName: "Pinged",
    enabled: !!vaultAddress && !!callbacks?.onPing,
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.owner && log.args.timestamp !== undefined) {
          callbacks?.onPing?.(log.args.owner, log.args.timestamp);
        }
      });
    },
  });

  // Watch Claimed events
  useWatchContractEvent({
    address: vaultAddress,
    abi: DeadmanVaultABI,
    eventName: "Claimed",
    enabled: !!vaultAddress && !!callbacks?.onClaim,
    onLogs(logs) {
      logs.forEach((log) => {
        if (log.args.beneficiary && log.args.amount !== undefined) {
          callbacks?.onClaim?.(log.args.beneficiary, log.args.amount);
        }
      });
    },
  });
}
