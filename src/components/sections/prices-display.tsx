'use client';

import { useState } from 'react';
import Subscribe from '../buttons/subscribe';
import { Switch } from '@headlessui/react';

type plan = {
  id: string;
  name: string;
  price: number | null;
  interval: string | undefined;
  currency: string;
  metadata: {
    max_host: number;
    max_people: number;
    max_join: number | string;
  };
  description: string | null;
};

export default function PricesDisplay({ plans }: { plans: plan[] }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="text-center flex flex-col justify-center items-center mb-8">
      <h1 className="text-4xl font-bold">Pricing</h1>
      <p className="py-2">Choose the best plan for you and start networking</p>
      <div className="mb-8 flex flex-row items-center">
        <p>Month</p>
        <Switch
          checked={yearly}
          onChange={setYearly}
          className={`${yearly ? 'bg-[--blue-3]' : 'bg-[--blue-1]'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mx-8`}
        >
          <span className="sr-only">Month / Year</span>
          <span
            aria-hidden="true"
            className={`${yearly ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <p>Year</p>
      </div>
      <div className="flex flex-col lg:flex-row mx-16 justify-center items-center w-full">
        {plans
          .filter((plan) => {
            return (plan.interval === 'year') === yearly;
          })
          .map((plan) => (
            <div
              key={plan?.id}
              className="text-start bg-[--white] rounded-xl shadow px-12 py-12 my-4 mx-4 lg:w-1/4 w-3/4 lg:h-full"
            >
              <h2 className="text-xl font-bold mb-4">{plan?.name}</h2>
              <p className="text-6xl font-bold whitespace-nowrap mb-4">
                {plan.name === 'Basic' ? 'Free' : `£${plan?.price! / 100}`}
              </p>
              <p className="mb-8 h-1/6">{plan.description}</p>
              <div className="flex flex-row h-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mb-2 ml-2">
                  Host {plan.metadata.max_host}{' '}
                  {plan.name === 'Basic' ? 'List' : 'Lists'}
                </p>
              </div>
              <div className="flex flex-row h-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mb-2 ml-2 h-16">
                  {plan.metadata.max_people} People Per List
                </p>
              </div>
              <div className="flex flex-row h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mb-8 ml-2">
                  Join{' '}
                  {plan.metadata.max_join === 'null'
                    ? 'Unlimited'
                    : `Up To ${plan.metadata.max_join}`}{' '}
                  lists
                </p>
              </div>
              <Subscribe planId={plan?.id} planName={plan?.name} />
            </div>
          ))}
      </div>
    </section>
  );
}
