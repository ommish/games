import React from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';

type Props = {
  message: string;
};
export const SuccessMessage: React.FC<Props> = ({ message }) => (
  <div className="flex items-center py-2 text-dixthis-primary-main text-2xl">
    <CheckCircleFill className="mr-1" />
    {message}
  </div>
);
