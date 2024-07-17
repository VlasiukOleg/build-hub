'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import sendingEmail from '@/utils/sendEmail';

import CircleIcon from '/public/icons/circle.svg';

import {
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from '@headlessui/react';

import clsx from 'clsx';

const phoneRegex = /^(0\d{2}) (\d{3}) (\d{2}) (\d{2})$/;

const orderValidationSchema = yup.object({
  firstName: yup.string().required("Це поле є обов'язковим до заповнення"),
  email: yup
    .string()
    .required("Це поле є обов'язковим до заповнення")
    .email('Не правильний email'),
  phone: yup
    .string()
    .matches(phoneRegex, 'Формат 068 688 88 88')
    .required("Це поле є обов'язковим до заповнення"),
  address: yup.string().required("Це поле є обов'язковим до заповнення"),
  message: yup.string().nullable(),
  date: yup.date().required("Це поле є обов'язковим до заповнення"),
});

export interface IFormState {
  firstName: string;
  email: string;
  phone: string;
  address: string;
  message?: string | null;
  date: Date;
}

interface IOrderFormProps {}

const OrderForm: React.FC<IOrderFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormState>({ resolver: yupResolver(orderValidationSchema) });

  const [sendError, setSendError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: IFormState) => {
    setSendError(false);
    const sanitizedData = {
      ...data,
    };
    console.log(sanitizedData);
    try {
      setIsSending(true);
      await sendingEmail(sanitizedData);
      reset();
    } catch (error) {
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="w-full xl:w-[48%]" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="space-y-3 rounded-xl bg-white/10 p-4 md:space-y-4">
        <Field className="relative">
          <Label className="text-xs/6 font-medium  text-white/50 md:text-sm">
            Ваше імя
          </Label>
          <Input
            {...register('firstName')}
            className={clsx(
              'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-xs/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />

          <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
            {errors.firstName?.message}
          </p>
        </Field>
        <Field className="relative">
          <Label className="text-xs/6 font-medium text-white/50 md:text-sm">
            Email
          </Label>
          <Input
            {...register('email')}
            className={clsx(
              'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-xs/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
            {errors.email?.message}
          </p>
        </Field>
        <Field className="relative">
          <Label className="text-xs/6 font-medium text-white/50 md:text-sm">
            Телефон
          </Label>
          <Input
            {...register('phone')}
            className={clsx(
              'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-xs/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
            {errors.phone?.message}
          </p>
        </Field>
        <Field className="relative">
          <Label className="text-xs/6 font-medium text-white/50 md:text-sm ">
            Адреса доставки
          </Label>
          <Input
            {...register('address')}
            className={clsx(
              'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-xs/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
            {errors.address?.message}
          </p>
        </Field>
        <Field className="relative">
          <Label className="text-xs/6 font-medium  text-white/50 md:text-sm">
            Дата та час доставки
          </Label>
          <Input
            type="datetime-local"
            {...register('date')}
            className={clsx(
              'mt-1 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
          />
          <p className="absolute left-0 bottom-[-20px] text-[10px]/6 text-red-600">
            {errors.date?.message}
          </p>
        </Field>

        <Field>
          <Label className="text-xs/6 font-medium text-white/50 md:text-sm">
            Додаткова інформація
          </Label>

          <Textarea
            {...register('message')}
            className={clsx(
              'mt-1 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white md:text-sm md:py-2',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            rows={3}
          />
        </Field>
      </Fieldset>
      <div className="text-center mt-4">
        <button type="submit" className="p-2 bg-accent rounded-md">
          {isSending && (
            <CircleIcon
              width={24}
              height={24}
              className="h-6 w-6 animate-spin"
            />
          )}
          Оформити замовлення
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
