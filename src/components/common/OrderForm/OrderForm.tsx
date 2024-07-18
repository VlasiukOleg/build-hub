'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/redux/hooks';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Modal = dynamic(() => import('@/components/ui/Modal'));
import ButtonLink from '@/components/ui/ButtonLink';
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
  const categories = useAppSelector(state => state.categories);
  const materials = categories.flatMap(material => material.materials);
  const filteredMaterialsByQuantity = materials.filter(
    material => material.quantity > 0
  );

  const router = useRouter();
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
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IFormState) => {
    setSendError(false);
    const sanitizedData = {
      ...data,
      firstName: data.firstName.trim(),
      phone: data.phone.replace(/[\s()-]/g, ''),
      email: data.email.trim(),
      address: data.address.trim(),
      message: data.message ? data.message.trim() : '',
      date: data.date,
      materials: filteredMaterialsByQuantity,
    };
    console.log(sanitizedData);
    try {
      setIsSending(true);
      await sendingEmail(sanitizedData);
      reset();
    } catch (error) {
      setSendError(true);
    } finally {
      setIsOpen(true);
      setIsSending(false);
    }
  };

  return (
    <>
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
        <div className="text-center mt-4 flex justify-center">
          <button
            type="submit"
            className="flex items-center gap-2 p-2 bg-accent rounded-md md:text-lg xl:text-xl"
            disabled={isSending}
          >
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
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="px-4 pb-8 rounded-md max-w-[320px] md:max-w-[526px] md:px-10 md:pb-10 xl:max-w-[677px] xl:px-[102px] bg-white text-center">
          {' '}
          <h3
            className={clsx(
              'mb-4 pt-[72px] text-center  text-[18px] font-bold leading-[1.15] text-[#3B433E] md:pt-[88px] md:text-lightLarge md:leading-[1.15] xl:text-3xl xl:leading-[1.15]',
              sendError && 'text-red'
            )}
          >
            {sendError ? 'Упс, щось пішло не так...' : 'Дякую за заявку!'}
          </h3>
          <p className="mb-8 text-center  text-light font-light tracking-[-0.02em] text-[#3B433E] xl:text-medium">
            {sendError
              ? 'Ми не змогли отримати Вашу заявку. Будь ласка, спробуйте ще раз.'
              : "Ваші дані були успішно відправлені. Будь ласка, очікуйте, ми зв'яжемося з вами найближчим часом для обговорення деталей."}
          </p>
          <ButtonLink variant="main" onClick={() => router.push('/')}>
            На головну
          </ButtonLink>
        </div>
      </Modal>
    </>
  );
};

export default OrderForm;
