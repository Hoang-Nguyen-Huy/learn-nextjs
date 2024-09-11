"use client";

import { redirectLoginGoogle } from "@/actions/authGoogle.actions";
import { Button } from "@geist-ui/core";

export default function LoginGoogleButton({
  disabled,
}: {
  disabled?: boolean;
}) {
  const handleLoginGoogle = async () => {
    await redirectLoginGoogle();
  };

  return (
    <Button
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder={undefined}
      onClick={handleLoginGoogle}
      disabled={disabled}
    >
      Login with Google
    </Button>
  );
}
