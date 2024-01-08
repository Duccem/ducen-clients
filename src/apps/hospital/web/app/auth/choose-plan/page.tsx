import { PeriodSwitch } from "../_module/components/PeriodSwitch";
import { PlanCard } from "../_module/components/PlanCard";

const plans = [
  {
    title: 'Free',
    identification: 'FREE',
    description: 'Small Teams',
    price: 0,
    benefits: [
      "Unlimited projects",
      "1 team",
      "Basic analytics"
    ]
  },
  {
    title: 'Professional',
    identification: 'BASIC',
    description: 'Established companies',
    price: 20,
    benefits: [
      "Unlimited projects",
      "Unlimited teams",
      "Advanced analytics"
    ]
  }
]
export default function Page({ searchParams }) {
  const { yearly } = searchParams;
  return (
    <>
      <div className='flex justify-center items-center flex-col mt-10 gap-5 pb-4'>
        <div className='w-full m-0 ml-10 text-sm font-medium'>
          <h1>Choose your plan and payment method</h1>
        </div>
        <div className='w-full ml-10'>
          <PeriodSwitch></PeriodSwitch>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-5 items-center h-full'>
          {
            plans.map((plan, index) => (
              <PlanCard key={index} {...plan} yearly={yearly}></PlanCard>
            ))
          }
        </div>
      </div>
    </>
  )
}
