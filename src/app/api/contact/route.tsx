import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import configuration from '@/utils/configuration';

interface Material {
  title: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const {
      firstName,
      phone,
      email,
      address,
      message,
      date,
      materials,
      deliveryTime,
      totalPrice,
      totalWeight,
      deliveryPrice,
      deliveryType,
      deliveryStorage,
      movingPrice,
      isMovingAddToOrder,
    } = await request.json();

    const formattedDate = format(new Date(date), "d MMMM yyyy 'року'", {
      locale: uk,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: configuration.apiMailUser,
        pass: configuration.apiMailPass,
      },
    });

    const materialsTable = `
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="border: 1px solid black; padding: 8px;">Назва</th>
        <th style="border: 1px solid black; padding: 8px;">Кількість</th>
        <th style="border: 1px solid black; padding: 8px;">Ціна за одиницю</th>
        <th style="border: 1px solid black; padding: 8px;">Загальна ціна</th>
      </tr>
    </thead>
    <tbody>
      ${materials
        .map(
          (material: Material) => `
        <tr>
          <td style="border: 1px solid black; padding: 8px;">${material.title}</td>
          <td style="border: 1px solid black; padding: 8px;">${material.quantity}</td>
          <td style="border: 1px solid black; padding: 8px;">${material.price} грн.</td>
          <td style="border: 1px solid black; padding: 8px;">${(material.quantity * material.price).toFixed(2)} грн.</td>
        </tr>
      `
        )
        .join('')}
      
      ${
        isMovingAddToOrder
          ? `
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Розвантаження</td>
          <td style="border: 1px solid black; padding: 8px;">1</td>
          <td style="border: 1px solid black; padding: 8px;">${movingPrice} грн.</td>
          <td style="border: 1px solid black; padding: 8px;">${movingPrice} грн.</td>
        </tr>`
          : ''
      }
        
      ${
        deliveryType === 'delivery'
          ? `
        <tr>
          <td style="border: 1px solid black; padding: 8px;">Доставка</td>
          <td style="border: 1px solid black; padding: 8px;">1</td>
          <td style="border: 1px solid black; padding: 8px;">${deliveryPrice} грн.</td>
          <td style="border: 1px solid black; padding: 8px;">${deliveryPrice} грн. </td>
        </tr>`
          : ''
      }
    </tbody>
  </table>
  <table style="width: 100%; margin-top: 16px;">
    <tr>
      <td style="font-weight: bold;">Вага: ${totalWeight} кг.</td>
      <td style="text-align: right; font-weight: bold;">Всього до оплати: ${((isMovingAddToOrder ? movingPrice : 0) + (deliveryType === 'pickup' ? 0 : deliveryPrice) + totalPrice).toFixed(2)} грн.</td>
    </tr>
  </table>
`;

    const mailOptions = {
      from: configuration.apiMailFrom,
      to: configuration.apiMailTo,
      subject: 'Нова заявка з сайту BudStock',
      html: `
        <p>Імʼя: ${firstName}</p>
        <p>Телефон: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Адреса: ${address}</p>
        <p>Дата та час: ${formattedDate} ${deliveryTime.name}</p>
        <p>Коментар: ${message}</p>
        ${materialsTable}
        
        <p>Склад: ${deliveryStorage ? deliveryStorage : 'Не вибрано'}</p>
        <p>Тип доставки: ${
          deliveryType
            ? deliveryType === 'delivery'
              ? 'Доставка автотранспотром'
              : 'Самовивіз зі складу'
            : 'Не вибрано'
        }</p>
      `,
    };

    const mailOptionsToClient = {
      from: configuration.apiMailFrom,
      to: email,
      subject: 'Підтвердження замовлення з сайту BudStock',
      html: `
        <p>Дякуємо за Ваше замовлення, ${firstName}!</p>
        <p>Ось деталі Вашого замовлення:</p>
        <p>Імʼя: ${firstName}</p>
        <p>Телефон: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Адреса: ${address}</p>
        <p>Дата та час: ${formattedDate} ${deliveryTime.name}</p>
        <p>Коментар: ${message}</p>
        ${materialsTable}
        
        <p>Склад: ${deliveryStorage ? deliveryStorage : 'Не вибрано'}</p>
        <p>Тип доставки: ${
          deliveryType
            ? deliveryType === 'delivery'
              ? 'Доставка автотранспотром'
              : 'Самовивіз зі складу'
            : 'Не вибрано'
        }</p>
        
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsToClient);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Failed to send message.', { status: 500 });
  }
}
