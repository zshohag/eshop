import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

// Define the props interface for the PaymentMethods component
interface PaymentMethodsProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

export default function PaymentMethods({
  selectedPaymentMethod,
  onPaymentMethodChange,
}: PaymentMethodsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 mt-4 ">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="mb-4">
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={onPaymentMethodChange}
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label
              htmlFor="credit_card"
              className="flex items-center gap-2 cursor-pointer"
            >
              
              <Image
                src="/images/credit.png"
                alt="Credit Card"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="google_pay" id="google_pay" />
            <Label
              htmlFor="google_pay"
              className="flex items-center gap-2 cursor-pointer"
            >
              <FcGoogle className="w-4 h-4" />
              Google Pay
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label
              htmlFor="paypal"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/images/paypal.png" // Add PayPal icon to your public folder
                alt="PayPal"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              PayPal
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
