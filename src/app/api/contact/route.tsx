import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import configuration from '@/utils/configuration';

export async function POST(request: Request) {
  try {
    const { firstName, phone, email, address, message, date, materials } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: configuration.apiMailUser,
        pass: configuration.apiMailPass,
      },
    });

    const materialsTable = `
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Общая сумма</th>
          </tr>
        </thead>
        <tbody>
          ${materials
            .map(
              (material: {
                title: string;
                quantity: number;
                price: number;
              }) => `
            <tr>
              <td>${material.title}</td>
              <td>${material.quantity}</td>
              <td>${material.price}</td>
              <td>${(material.quantity * material.price).toFixed(2)}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
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
        <p>Дата та час: ${date}</p>
        <p>Коментар: ${message}</p>
        ${materialsTable}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Failed to send message.', { status: 500 });
  }
}
