import React from 'react';

interface LabelProps {
  text: string; 
  className?: string; 
}

interface TwoLabelsProps {
  label1: LabelProps;
  label2: LabelProps;
  containerClassName?: string;
}

const TwoLabels: React.FC<TwoLabelsProps> = ({ label1, label2, containerClassName }) => {
  return (
    <div className={`flex flex-col text-center space-y-2 ${containerClassName}`}>
      <label className={label1.className}>{label1.text}</label>
      <label className={label2.className}>{label2.text}</label>
    </div>
  );
};

export default TwoLabels;
