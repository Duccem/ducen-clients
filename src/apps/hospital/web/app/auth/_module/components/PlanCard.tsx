'use client'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, Card } from 'ui';
import { useGuildContext } from '../../../../modules/guild/GuildContext';
import { usePaymentContext } from '../../../../modules/payment/PaymentContext';

export function PlanCard({ title, description, price, benefits, yearly, identification }) {
  const location = useRouter()
  const { changePlan, guildState } = useGuildContext();
  const { createPaymentSession, getLastPaymentSession, setPlan, setPeriod, paymentState, setGuildID } = usePaymentContext();
  const goToMakePayment = (plan: string) => {
    setPlan(plan);

  };
  useEffect(() => {
    async function setPlanChoose() {
      if(!paymentState.plan) return;
      await changePlan(paymentState.plan)
      if(paymentState.plan === 'FREE') {
        location.push('/auth/completed')
      }else {
        await createPaymentSession();
        const { url } = await getLastPaymentSession();
        window.location.href = url.value;
      }
    }
    setPlanChoose()
  }, [paymentState.plan])

  useEffect(() => {
    setGuildID(guildState.guildId);
    setPeriod(yearly);
  }, [])
  return (
    <>
      <Card key={title} minHeight={'400px'} minWidth={'40%'} paddingX={'20px'} paddingY={'20px'}>
        <div className="flex justify-start items-center text-xl font-semibold">
          <p className="m-0">{title}</p>
        </div>
        <p className="font-medium text-base text-[#3E3E3E]">{description}</p>
        <div className="flex justify-start items-center">
          <p className="m-0 text-3xl font-semibold">${yearly === 'true' ? price * 12 : price}</p>
          <span className="ml-5 text-base font-normal">{yearly === 'true' ? '/year' : '/month'}</span>
        </div>
        <Button marginTop={'15px'}>Subscribe</Button>
        <div className="flex flex-col justify-start">
          {benefits.map((benefit) => (
            <div key={benefit} className="mt-2 flex justify-start items-center" onClick={() => goToMakePayment(identification)}>
              <div className="flex justify-center items-center mr-3 p-2 bg-[var(--main-color)] text-white rounded-full h-5 w-5">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <p className="m-0">{benefit}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
