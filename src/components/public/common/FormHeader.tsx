import type { ElementType } from "react";

type Props = {
    Icon: ElementType
    title: string
    description: string
}

const FormHeader = ({ Icon, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-background p-3 rounded-lg shadow-md">
        <Icon size={24} />
      </div>

      <h4 className="text-lg font-bold mt-4 mb-1">{title}</h4>

      <p className="description text-center">
        {description}
      </p>
    </div>
  );
};

export default FormHeader;
