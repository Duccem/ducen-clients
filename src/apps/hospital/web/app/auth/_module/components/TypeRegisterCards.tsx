'use client'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../modules/shared/auth/AuthContext';

export function TypeRegisterCards() {
  const navigate = useRouter();
  const { setRegisterType } = useAuthContext()
  return (
    <>
      <div
        className="flex justify-between items-center p-3 bg-[#9747FF] mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
        onClick={() => {
          setRegisterType('member');
          navigate.push('/auth/identify-guild');
        }}
      >
        <div className="flex justify-start items-center">
          <Image src="/images/type-register1.png" alt="type-register1" width="50" height="50" />
          <p className="ml-4 font-bold text-lg">Join to a Guild</p>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <div
        className="flex justify-between items-center p-3 bg-[#9747FF] mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
        onClick={() => {
          setRegisterType('guild');
          navigate.push('/auth/register-guild');
        }}
      >
        <div className="flex justify-start items-center">
          <Image src="/images/type-register2.png" alt="type-register2" width="50" height="50" />
          <p className="ml-4 font-bold text-lg">Create new Guild</p>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </>
  );
}
