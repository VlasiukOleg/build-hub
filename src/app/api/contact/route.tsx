import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import configuration from '@/utils/configuration';

export async function POST(request: Request) {
  try {
    const { firstName, phone, email, address, message, date } =
      await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: configuration.apiMailUser,
        pass: configuration.apiMailPass,
      },
    });

    const mailOptions = {
      from: configuration.apiMailFrom,
      to: configuration.apiMailTo,
      subject: 'Нова заявка з сайту BudStock',
      text: `Імʼя: ${firstName}\nТелефон: ${phone}\nEmail: ${email}\nАдреса: ${address}\nДата та час: ${date}\nКоментар: ${message}`,
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
