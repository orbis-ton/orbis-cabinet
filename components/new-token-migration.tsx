"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fromNano } from "@ton/ton";
import { useMigration } from "@/hooks/use-migration";
import { useBalancesContext } from "@/contexts/balances-context";
import { useMyNfts, useUnclaimedRewards } from "@/hooks/use-nfts";
import type { MyNft, UnclaimedRewardsData } from "@/hooks/use-nfts";
import { useCollectRewards } from "@/hooks/use-collect-rewards";

interface NewTokenMigrationProps {
  collectRewards: (
    eligibleNfts: MyNft[],
    setIsCollectRewardsPending: (isCollectRewardsPending: boolean) => void,
    setCollectRewardsError: (collectRewardsError: string | null) => void
  ) => void;
}

interface CollectRewardsStepProps {
  unclaimedReward_old: bigint;
  firstFourEligibleAmount: bigint;
  collectRewards: () => void;
  error: string | null;
}

function CollectRewardsStep({
  unclaimedReward_old,
  firstFourEligibleAmount,
  collectRewards,
  error,
}: CollectRewardsStepProps) {
  const { t } = useLanguage();

  return (
    <div>
      <Button
        onClick={() => collectRewards()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.collectRewards")}
        {unclaimedReward_old > 0n &&
          ` (${parseFloat(fromNano(firstFourEligibleAmount.toString())).toFixed(2)} / ${parseFloat(fromNano(unclaimedReward_old.toString())).toFixed(2)} ORBC)`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step1")}</p>
    </div>
  );
}

function MigrateNftsStep({
  countNfts,
  migrateNfts,
  error,
}: {
  countNfts: number;
  migrateNfts: () => void;
  error: string | null;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <Button
        onClick={() => migrateNfts()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.migrateNFTs")}
        {` (${countNfts})`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step2")}</p>
    </div>
  );
}

function MigrateTokensStep({
  balance_old,
  migrateTokens,
  error,
}: {
  balance_old: bigint | null;
  migrateTokens: () => void;
  error: string | null;
}) {
  const { t } = useLanguage();
  return (
    <div>
      <Button
        onClick={() => migrateTokens()}
        className="bg-purple-600 hover:bg-purple-700"
        size="lg"
      >
        {t("migration.migrateTokens")}
        {` (${fromNano(balance_old!.toString())})`}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-muted-foreground font-small mt-2">{t("migration.step3")}</p>
    </div>
  );
}

export function NewTokenMigration() {
  const { t } = useLanguage();
  const collectRewards1 = useCollectRewards("1");
  const collectRewards2 = useCollectRewards("2");
  const { balance1, balance2 } = useBalancesContext();

  const { fetchUnclaimedRewardsData: fetchUnclaimedRewardsData1 } = useUnclaimedRewards("1");
  const { fetchUnclaimedRewardsData: fetchUnclaimedRewardsData2 } = useUnclaimedRewards("2");

  const { fetchMyNfts: fetchMyNfts1 } = useMyNfts("1");
  const { fetchMyNfts: fetchMyNfts2 } = useMyNfts("2");
  
  const [myNfts1, setMyNfts1] = useState<MyNft[] | null>(null);
  const [myNfts2, setMyNfts2] = useState<MyNft[] | null>(null);
  const [unclaimed1, setUnclaimed1] = useState<UnclaimedRewardsData | null>(null);
  const [unclaimed2, setUnclaimed2] = useState<UnclaimedRewardsData | null>(null);

  useEffect(() => {
    (async () => {
      const myNfts1 = await fetchMyNfts1();
      const myNfts2 = await fetchMyNfts2();
      const unclaimedRewardsData1 = await fetchUnclaimedRewardsData1();
      const unclaimedRewardsData2 = await fetchUnclaimedRewardsData2();

      setMyNfts1(myNfts1);
      setMyNfts2(myNfts2);
      setUnclaimed1(unclaimedRewardsData1);
      setUnclaimed2(unclaimedRewardsData2);

    })();
  }, [fetchMyNfts1, fetchMyNfts2, fetchUnclaimedRewardsData1, fetchUnclaimedRewardsData2]);

  const step =
    unclaimed1 && unclaimed1.totalUnclaimed > 0n
      ? "rewards1"
    : unclaimed2 && unclaimed2.totalUnclaimed > 0n
      ? "rewards2"
    : myNfts1 !== null && myNfts1.length > 0
      ? "nfts1"
    : myNfts2 !== null && myNfts2.length > 0
      ? "nfts2"
    : balance1 !== null && balance1 > 0n
      ? "tokens1"
    : balance2 !== null && balance2 > 0n 
      ? "tokens2" 
    : unclaimed1 && unclaimed2 && myNfts1 && myNfts2 && balance1 && balance2 
      ? "migrated"
    : "loading";

  const { migrateNFTs, migrateTokens, isTxPending, error, setError, setIsTxPending } = useMigration();

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
        <Card className="border-blue-400">
          <CardHeader className="flex flex-row items-start gap-4">
            <InfoIcon className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <CardTitle className="text-xl">{t("migration.title")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {t("migration.description")}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Old Balance:
                </span>
                <span className="font-medium">
                  {balance1 !== null
                    ? fromNano(balance1.toString())
                    : "loading..."}{" "}
                  ORBC
                  <br />
                  {balance2 !== null
                    ? fromNano(balance2.toString())
                    : "loading..."}{" "}
                  ORB
                </span>
                
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  NFTs on Old Network:
                </span>
                <span className="font-medium">
                  {myNfts1 !== null ? myNfts1.length : "loading..."}
                  <br />
                  {myNfts2 !== null ? myNfts2.length : "loading..."}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Unclaimed Rewards:
                </span>
                <span className="font-medium">
                  {unclaimed1 !== null ? fromNano(unclaimed1.totalUnclaimed.toString()) : "loading..."} ORBC
                  <br />
                  {unclaimed2 !== null ? fromNano(unclaimed2.totalUnclaimed.toString()) : "loading..."} ORB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center space-y-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
        {isTxPending && (
          <div className="flex flex-col items-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600 mb-2"></div>
            <p>{"Processing transaction..."}</p>
          </div>
        )}
        {step === "rewards1" && !isTxPending && (
          <CollectRewardsStep
            unclaimedReward_old={unclaimed1!.totalUnclaimed}
            firstFourEligibleAmount={unclaimed1!.firstFourEligibleAmount}
            collectRewards={() => collectRewards1(unclaimed1!.eligibleNfts, setIsTxPending, setError)}
            error={error}
          />
        )}
        {step === "rewards2" && !isTxPending && (
          <CollectRewardsStep
            unclaimedReward_old={unclaimed2!.totalUnclaimed}
            firstFourEligibleAmount={unclaimed2!.firstFourEligibleAmount}
            collectRewards={() => collectRewards2(unclaimed2!.eligibleNfts, setIsTxPending, setError)}
            error={error}
          />
        )}
        {step === "nfts1" && myNfts1 !== null && !isTxPending && (
          <MigrateNftsStep
            countNfts={myNfts1.length}
            error={error}
            migrateNfts={() => migrateNFTs("1", myNfts1)}
          />
        )}
        {step === "nfts2" && myNfts2 !== null && !isTxPending && (
          <MigrateNftsStep
            countNfts={myNfts2.length}
            error={error}
            migrateNfts={() => migrateNFTs("2", myNfts2)}
          />
        )}
        {step === "tokens1" && balance1 !== null && !isTxPending && (
          <MigrateTokensStep
            error={error}
            balance_old={balance1}
            migrateTokens={() => migrateTokens("1", balance1)}
          />
        )}
        {step === "tokens2" && balance2 !== null && !isTxPending && (
          <MigrateTokensStep
            error={error}
            balance_old={balance2}
            migrateTokens={() => migrateTokens("2", balance2)}
          />
        )}
      </div>
    </div>
  );
}
