import Link from 'next/link';
import { SocialButton } from 'ui';
import { Facebook } from '../../_shared/components/icons/facebook';
import { Google } from '../../_shared/components/icons/google';
import { XIcon } from '../../_shared/components/icons/x';
import { LoginForm } from '../_module/components/LoginForm';

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-full box-border">
        <div className="h-full w-full p-[15px] flex flex-col box-border items-center justify-center">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-[5px]">Hey, Hello!</p>
            <p className="text-lg font-normal">Welcome to Helsa, your mobile hospital!</p>
          </div>
          <div className="my-5 w-3/4">
            <LoginForm></LoginForm>
            <div className="flex justify-between items-center">
              <Link className="mt-5 block text-black no-underline hover:underline" href="/auth/recovery-password">
                Forgot password?
              </Link>
              <Link className="font-semibold mt-5 block text-black no-underline hover:underline" href="/auth/select-register">
                Sign Up for Free
              </Link>
            </div>
          </div>
          <div className="mt-8 w-3/4 flex flex-row justify-start items-center gap-5">
            <p>Log in with</p>
            <div className="flex gap-3">
              <SocialButton>
                <Google size={15}/>
              </SocialButton>
              <SocialButton>
                <Facebook size={15}/>
              </SocialButton>
              <SocialButton>
                <XIcon size={15}/>
              </SocialButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
