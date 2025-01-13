import PhoneInput from "@/components/shared/PhoneInput";
import { useAuth } from "@/context/Bint";
import useFetchHook from "@/hooks/useFetchHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ModalBox from "@/components/shared/ModalBox";
import { singInValidation } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { Spin } from "antd";
import { toast } from "@/hooks/use-toast";
type PhoneSchema = {
  phone: {
    dialCode: string;
    number: string;
  };
};

type FormData = {
  phone: PhoneSchema["phone"];
  password: string;
};
function ProfilePhone({
  editPhone,
  setEditPhone,
}: {
  editPhone: boolean;
  setEditPhone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { phone, dialCode, newPhone, newDialCode } = useAuth()?.data;
  const isNewPhone = `${newDialCode}${newPhone}`;
  const { isLoading } = useFetchHook();
  const phoneValidation = z.object({
    phone: z.object({
      dialCode: z
        .string()
        .min(1, {
          message: "Dial code is required",
        })
        .regex(/^\+\d+$/, {
          message: "Dial code must start with '+' followed by numbers",
        }),
      number: z
        .string()
        .min(5, {
          message: "Phone number must be at least 5 characters",
        })
        .regex(/^\d+$/, {
          message: "Phone number can only contain digits",
        }),
    }),
  });
  const {
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm<PhoneSchema>({
    resolver: zodResolver(phoneValidation),
    defaultValues: {
      phone: {
        dialCode: "",
        number: phone,
      },
    },
  });
  const handleClose = () => setEditPhone(false);
  // Watch the phone field object
  return (
    <div className="p-[20px] space-y-3 select-none">
      <h1 className="text-center text-xl font-bold text-mainColor uppercase">
        whatsapp Phone Number
      </h1>
      <PhoneInput
        setValue={setValue}
        defaultValue={`${dialCode}${phone}` || ""}
        clearErrors={clearErrors}
        name="phone" // Main phone field name
        label=""
        error={errors.phone}
        placeholder="Enter phone number"
        disabled={true}
      />
      {isNewPhone && <NewPhoneBox setEditPhone={setEditPhone} />}
      <footer className="flex  flex-wrap justify-between gap-3">
        <ModalBox
          title={"change phone number"}
          desc={"we will send you a code"}
          call={
            <h1
              className="text-sm text-mainColor capitalize underline hover:text-mainOrange cursor-pointer"
              onClick={() => setEditPhone(true)}
            >
              {!isNewPhone ? "Change whatsapp number" : "Change phone number"}
            </h1>
          }
          isOpen={editPhone}
          onClose={() => false}
          btn="Save"
        >
          <ChangeForm setEditPhone={setEditPhone} />
        </ModalBox>

        <h1 className="text-sm text-mainColor capitalize underline  hover:text-mainOrange cursor-pointer">
          Change password
        </h1>
      </footer>
    </div>
  );
}

function ChangeForm({
  setEditPhone,
}: {
  setEditPhone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { phoneNumber, _id } = useAuth()?.data;

  const { Post, isLoading } = useFetchHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(singInValidation),
  });
  const phone = watch("phone");
  const password = watch("password");
  const onSubmit = async (datas: FormData): Promise<void> => {
    const phones = datas.phone;
    const newPhoneNumber = `${phones.dialCode}${phones.number}`;
    if (newPhoneNumber === phoneNumber) {
      toast({
        variant: "destructive",
        description: "Phone number is same as current phone number",
        duration: 3000,
      });
      return;
    }
    try {
      const res = await Post({
        url: `/users/updateMyPhone/${_id}`,
        body: {
          dialCode: phone.dialCode,
          phone: phone.number,
          password,
        },
        method: "PUT",
        v: 2,
      });
      if (!res.ok) {
        toast({
          variant: "destructive",
          description: res?.message,
          duration: 3000,
        });
        return;
      }
      setEditPhone(false);
      toast({
        description: "Login successful",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Login failed", error);
      toast({
        variant: "destructive",
        description: error?.message || "Login failed",
        duration: 3000,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 relative select-none p-3 rounded-md border border-input bg-background"
    >
      <PhoneInput
        setValue={setValue}
        clearErrors={clearErrors}
        name="phone" // Main phone field name
        label="Phone"
        error={errors.phone}
        placeholder="Enter phone number"
        disabled={isLoading}
      />
      <InputField
        register={register}
        clearErrors={clearErrors}
        name="password"
        label="Password"
        error={errors.password} // Error related to the password field
        placeholder="Enter password"
        disabled={isLoading}
      />
      <footer className="flex justify-end">
        <Button
          type="submit"
          disabled={!phone || !password || isLoading}
          className="w-[100px] "
        >
          {isLoading ? <Spin size="small" /> : "submit"}
        </Button>
      </footer>
    </form>
  );
}
function NewPhoneBox({ setEditPhone }: { setEditPhone: any }) {
  const { phone, dialCode, newPhone, newDialCode } = useAuth()?.data;
  const isNewPhone = `${newDialCode}${newPhone}`;
  const { isLoading } = useFetchHook();
  const phoneValidation = z.object({
    phone: z.object({
      dialCode: z
        .string()
        .min(1, {
          message: "Dial code is required",
        })
        .regex(/^\+\d+$/, {
          message: "Dial code must start with '+' followed by numbers",
        }),
      number: z
        .string()
        .min(5, {
          message: "Phone number must be at least 5 characters",
        })
        .regex(/^\d+$/, {
          message: "Phone number can only contain digits",
        }),
    }),
  });
  const {
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue,
  } = useForm<PhoneSchema>({
    resolver: zodResolver(phoneValidation),
    defaultValues: {
      phone: {
        dialCode: "",
        number: phone,
      },
    },
  });
  return (
    <div className="pt-5">
      <h1 className="text-center text-xl font-bold text-mainColor uppercase">
        new whatsapp phone number
      </h1>
      <div className="flex items-center justify-center gap-2">
        <PhoneInput
          setValue={setValue}
          defaultValue={`${newDialCode}${newPhone}` || ""}
          clearErrors={clearErrors}
          name="phone" // Main phone field name
          label=""
          error={errors.phone}
          placeholder="Enter phone number"
          disabled={true}
        />
        <Button onClick={() => setEditPhone(false)} className="w- mt-2">
          Confirm
        </Button>
      </div>
    </div>
  );
}
export default ProfilePhone;
