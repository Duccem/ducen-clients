'use client'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../../modules/auth/AuthContext';
import { Doctor } from '../../../_shared/components/icons/doctor';
import { Heart } from '../../../_shared/components/icons/heart';

export function TypeRegisterCards() {
  const navigate = useRouter();
  const { setRegisterType, setPartialUser } = useAuthContext()
  const selectAndGoToRegister = (type: 'DOCTOR' | 'PATIENT') => {
    setRegisterType(type);
    setPartialUser({
      role: type as any
    });
    navigate.push('register-user');
  }
  return (
    <>
      <div
        className="flex justify-between items-center p-3 border-black border-2 mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
        onClick={() => selectAndGoToRegister('DOCTOR')}
      >
        <div className="flex justify-start items-center">
          <Doctor size={30}/>
          <p className="ml-4 font-bold text-lg">Doctor</p>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <div
        className="flex justify-between items-center p-3 border-black border-2 mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
        onClick={() => selectAndGoToRegister('PATIENT')}
      >
        <div className="flex justify-start items-center">
          <Heart size={30}/>
          <p className="ml-4 font-bold text-lg">Patient</p>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </>
  );
}
