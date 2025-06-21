"use client";

import * as React from "react";
import { useState } from "react";
import { calculateEarnings } from "../algorithm/algorithm";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      income: "",
      employment: "w2",
      state: "CA",
      hoursWorkedSoFar: "",
      hoursToBeWorkedToday: "",
    },
  });

  // Watch form values for real-time display
  const watchedHoursWorkedSoFar = watch("hoursWorkedSoFar");
  const watchedHoursToBeWorkedToday = watch("hoursToBeWorkedToday");

  const US_STATES = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const stateOptions = US_STATES.map((state) => (
    <SelectItem key={state} value={state}>
      {state}
    </SelectItem>
  ));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [earningsResult, setEarningsResult] = useState<any | null>(null);
  const [workStartTime, setWorkStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Start timer on submit
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (
      workStartTime &&
      earningsResult &&
      watchedHoursToBeWorkedToday &&
      parseFloat(watchedHoursToBeWorkedToday) > 0
    ) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - workStartTime) / 1000);
        setElapsedSeconds(elapsed);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workStartTime, earningsResult, watchedHoursToBeWorkedToday]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (data: any) => {
    setWorkStartTime(Date.now()); // set start time on submit
    // Convert state name to state code for the algorithm
    const stateCodes: { [key: string]: string } = {
      Alabama: "AL",
      Alaska: "AK",
      Arizona: "AZ",
      Arkansas: "AR",
      California: "CA",
      Colorado: "CO",
      Connecticut: "CT",
      Delaware: "DE",
      Florida: "FL",
      Georgia: "GA",
      Hawaii: "HI",
      Idaho: "ID",
      Illinois: "IL",
      Indiana: "IN",
      Iowa: "IA",
      Kansas: "KS",
      Kentucky: "KY",
      Louisiana: "LA",
      Maine: "ME",
      Maryland: "MD",
      Massachusetts: "MA",
      Michigan: "MI",
      Minnesota: "MN",
      Mississippi: "MS",
      Missouri: "MO",
      Montana: "MT",
      Nebraska: "NE",
      Nevada: "NV",
      "New Hampshire": "NH",
      "New Jersey": "NJ",
      "New Mexico": "NM",
      "New York": "NY",
      "North Carolina": "NC",
      "North Dakota": "ND",
      Ohio: "OH",
      Oklahoma: "OK",
      Oregon: "OR",
      Pennsylvania: "PA",
      "Rhode Island": "RI",
      "South Carolina": "SC",
      "South Dakota": "SD",
      Tennessee: "TN",
      Texas: "TX",
      Utah: "UT",
      Vermont: "VT",
      Virginia: "VA",
      Washington: "WA",
      "West Virginia": "WV",
      Wisconsin: "WI",
      Wyoming: "WY",
    };
    const formData = {
      ...data,
      state: stateCodes[data.state] || data.state,
      hours: data.hoursWorkedSoFar, // rename for algorithm compatibility
    };
    const result = calculateEarnings(formData);
    setEarningsResult(result);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen mt-8 md:mt-0 p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="row-start-1 flex gap-4 flex-col items-center justify-center md:mb-12">
        <Link href="/">
          <Image src="/logo.svg" alt="NetPay" width={50} height={50} />
        </Link>
        <span className="text-red-500 font-bold text-3xl bg-red-100 py-2 px-4 rounded opacity-50">
          THIS IS A CONCEPT
        </span>
      </header>

      {/* Main */}
      <main className="flex flex-col md:flex-row gap-[32px] h-full md:w-5xl md:mx-auto">
        {/* Details */}
        <div className="flex-1 flex-col gap-[32px] h-full rounded-2xl p-2">
          {/* Navigation */}
          <nav>
            <h1 className="text-2xl font-bold text-[#0f3471]">Details</h1>
          </nav>
          {/* Content */}
          <div>
            {/* Form for details */}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col gap-[16px] mt-8"
            >
              {/* Income per hour */}
              <Label htmlFor="income">Income per hour</Label>
              <div className="relative">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </div>
                <Input
                  type="number"
                  id="income"
                  {...register("income")}
                  className="w-full pl-6"
                  required
                />
              </div>
              {errors.income && (
                <p className="text-red-500">Income is required.</p>
              )}

              {/* Type of employment */}
              <Label htmlFor="employment">Employee Type (IRS Form)</Label>
              <Select {...register("employment")} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type of employment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="w2">W-2 Employee (Form W-2)</SelectItem>
                  <SelectItem value="1099">
                    Self-Employed / Contractor (Form 1099)
                  </SelectItem>
                  <SelectItem value="employer">Employer (Form 941)</SelectItem>
                  <SelectItem value="itin">
                    Nonresident / ITIN Applicant (Form W-7)
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.employment && (
                <p className="text-red-500">Employment is required.</p>
              )}

              {/* State of residence */}
              <Label htmlFor="state">State of residence</Label>
              <Select {...register("state")} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent className="w-full">{stateOptions}</SelectContent>
              </Select>
              {errors.state && (
                <p className="text-red-500">State is required.</p>
              )}

              {/* Hours */}
              <div className="flex flex-row gap-12 w-full">
                {/* Hours worked so far */}
                <div>
                  <Label htmlFor="hoursWorkedSoFar">Hours worked so far</Label>
                  <Input
                    type="number"
                    id="hoursWorkedSoFar"
                    {...register("hoursWorkedSoFar", { required: true })}
                    className="w-full mt-2"
                    required
                  />
                  {errors.hoursWorkedSoFar && (
                    <p className="text-red-500">
                      Hours worked so far is required.
                    </p>
                  )}
                </div>

                {/* Hours to be worked today */}
                <div>
                  <Label htmlFor="hoursToBeWorkedToday">
                    Hours to be worked today
                  </Label>
                  <Input
                    type="number"
                    id="hoursToBeWorkedToday"
                    {...register("hoursToBeWorkedToday", { required: true })}
                    className="w-full mt-2"
                    required
                  />
                  {errors.hoursToBeWorkedToday && (
                    <p className="text-red-500">
                      Hours to be worked today is required.
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="">
                <Button
                  type="submit"
                  className=" bg-[#0f3471] hover:bg-[#0f3471]/80 cursor-pointer text-white w-full"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Real time income */}
        <div className="flex-1 flex-col gap-[32px] h-full rounded-2xl p-2">
          {/* Navigation */}
          <nav>
            <h1 className="text-2xl font-bold text-[#0f3471]">
              Real time income
            </h1>

            {/* Real time income */}
            <div className=" p-4 rounded-md shadow-md">
              {/* Time */}
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-gray-400">
                    Current Time
                  </h3>
                  <p className="font-bold">{new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex-1 whitespace-nowrap">
                  <h3 className="text-xs font-semibold text-gray-400">
                    Time started working
                  </h3>
                  <p className="font-bold">
                    {watchedHoursWorkedSoFar
                      ? `${watchedHoursWorkedSoFar} hours ago`
                      : "--"}
                  </p>
                </div>
                <div className="flex-1 whitespace-nowrap">
                  <h3 className="text-xs font-semibold text-gray-400">
                    Hours to be worked today
                  </h3>
                  <p className="font-bold">
                    {watchedHoursToBeWorkedToday
                      ? `${watchedHoursToBeWorkedToday} hours`
                      : "--"}
                  </p>
                </div>
              </div>

              {/* Money earned so far */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Money earned so far
                </h3>
                <p className="font-bold text-2xl">
                  {earningsResult &&
                  watchedHoursToBeWorkedToday &&
                  workStartTime
                    ? (() => {
                        const hoursToBeWorked =
                          parseFloat(watchedHoursToBeWorkedToday) || 0;
                        const hoursWorkedSoFar =
                          parseFloat(watchedHoursWorkedSoFar) || 0;
                        const elapsedHours = Math.max(
                          0,
                          Math.min(
                            elapsedSeconds / 3600,
                            hoursToBeWorked - hoursWorkedSoFar,
                          ),
                        );
                        const totalHours = Math.min(
                          hoursWorkedSoFar + elapsedHours,
                          hoursToBeWorked,
                        );
                        const earned =
                          earningsResult.grossPay *
                          (totalHours / hoursToBeWorked);
                        return `$${(earned > earningsResult.grossPay
                          ? earningsResult.grossPay
                          : earned
                        ).toFixed(2)}`;
                      })()
                    : "--"}
                </p>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="mt-8 flex flex-col gap-4">
            {/* Income */}
            <div>
              <h2 className="text-lg font-bold text-gray-600">
                Your total income today should be:{" "}
                <span className="font-bold text-2xl">
                  {earningsResult
                    ? `$${earningsResult.grossPay.toFixed(2)}`
                    : "--"}
                </span>
              </h2>
            </div>
            {/* Deductions */}
            <div className="h-[88px]">
              <h2 className="text-lg font-bold text-gray-600">
                Deductions:{" "}
                <span>
                  {earningsResult
                    ? `$${(
                        earningsResult.federalTax +
                        earningsResult.stateTax +
                        earningsResult.ficaTax
                      ).toFixed(2)}`
                    : "--"}
                </span>
              </h2>
              <div className="text-sm text-gray-600 ml-2">
                {earningsResult && (
                  <>
                    <div>Federal: ${earningsResult.federalTax.toFixed(2)}</div>
                    <div>State: ${earningsResult.stateTax.toFixed(2)}</div>
                    <div>FICA: ${earningsResult.ficaTax.toFixed(2)}</div>
                  </>
                )}
              </div>
            </div>
            {/* NetPay */}
            <div className="mt-4 h-[60px] w-fit">
              <h2 className="text-2xl font-bold text-[#0f3471]">
                NetPay:{" "}
                <span className="font-bold text-4xl">
                  {earningsResult &&
                  watchedHoursToBeWorkedToday &&
                  workStartTime
                    ? (() => {
                        const hoursToBeWorked =
                          parseFloat(watchedHoursToBeWorkedToday) || 0;
                        const hoursWorkedSoFar =
                          parseFloat(watchedHoursWorkedSoFar) || 0;
                        const elapsedHours = Math.max(
                          0,
                          Math.min(elapsedSeconds / 3600, hoursToBeWorked),
                        );
                        const totalWorked = hoursWorkedSoFar + elapsedHours;
                        const earnedNet =
                          earningsResult.netPay *
                          (totalWorked / hoursToBeWorked);
                        return `$${(earnedNet > earningsResult.netPay
                          ? earningsResult.netPay
                          : earnedNet
                        ).toFixed(2)}`;
                      })()
                    : earningsResult
                      ? `$${earningsResult.netPay.toFixed(2)}`
                      : "--"}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-col gap-[24px] flex-wrap items-center justify-center">
        <span className="text-[#0f3471] font-bold text-xs">
          Made by Amour Hamisi Omar &copy; {new Date().getFullYear()} --
          experiment
        </span>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          <span>
            <Link href="/about" className="text-[#0f3471] font-bold text-xs">
              About
            </Link>
          </span>
          <span>
            <Link
              href="https://github.com/amouromar"
              className="text-[#0f3471] font-bold text-xs"
            >
              GitHub
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
