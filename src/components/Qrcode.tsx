import React from 'react';
import { useQRCode } from 'next-qrcode';

export type OTPQrcodeType = {
  uri: string;
};

function OTPQrcode({ uri }: OTPQrcodeType) {
  const { SVG } = useQRCode();

  return (
    <SVG
      text={uri}
      options={{
        margin: 2,
        width: 200,
      }}
    />
  );
}

export default OTPQrcode;
