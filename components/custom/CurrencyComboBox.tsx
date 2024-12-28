"use client";

import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currencies } from "@/lib/data/currencies";
import SkeletonWrapper from "./SkeletonWrapper";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

export type Currency = (typeof Currencies)[0];

type UserSettings = {
  currency: string;
};

async function fetchUserSettings(): Promise<UserSettings> {
  const response = await fetch("/api/user-settings");
  if (!response.ok) {
    const error = await response.text();
    console.error("Error fetching user settings:", error);
    throw new Error(`Failed to fetch user settings: ${error}`);
  }
  return response.json();
}

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  const {
    data: userSettings,
    isLoading,
    error,
  } = useQuery<UserSettings, Error>({
    queryKey: ["userSettings"],
    queryFn: fetchUserSettings,
  });

  React.useEffect(() => {
    if (userSettings && userSettings.currency) {
      const defaultCurrency = Currencies.find(
        (cur) => cur.value === userSettings.currency
      );
      setSelectedCurrency(defaultCurrency || null);
    }
  }, [userSettings]);

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Currency updated successfully", {
        id: "update-currency",
      });

      setSelectedCurrency(
        Currencies.find((cur) => cur.value === data.currency) || null
      )
    },
    onError:(err)=>{
      toast.error(`Failed to update currency: ${err.message}`, {
        id: "update-currency",
      });
    }

  });

  const selectOption = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Please select a currency");
        return;
      }

      toast.loading("Updating currency...", { id: "update-currency" });

      mutation.mutate(currency.value, {
        onSuccess: () => {
          toast.success("Currency updated successfully", {
            id: "update-currency",
          });
          setSelectedCurrency(currency);
        },
        onError: (err: Error) => {
          toast.error(`Failed to update currency: ${err.message}`, {
            id: "update-currency",
          });
        },
      });
    },
    [mutation, setSelectedCurrency]
  );

  if (isLoading) {
    return (
      <SkeletonWrapper isLoading>
        <Button variant="outline" className="w-[200px] justify-start">
          Loading...
        </Button>
      </SkeletonWrapper>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={false}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start"
              disabled={mutation.isPending}
            >
              {selectedCurrency ? (
                <>{selectedCurrency.label}</>
              ) : (
                <>+ Select Currency</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selectOption}
            />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {selectedCurrency ? (
            <>{selectedCurrency.label}</>
          ) : (
            <>+ Select Currency</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CurrencyList setOpen={setOpen} setSelectedCurrency={selectOption} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CurrencyList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (currency: Currency | null) => void;
}) {
  return (
    <Command role="menu" aria-label="Currency Selector">
      <CommandInput placeholder="Filter currencies..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                const selected = Currencies.find((cur) => cur.value === value);
                setSelectedCurrency(selected || null);
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
