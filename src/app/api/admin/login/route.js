import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const validEmail = email === 'highqualityadmin.com' || email === 'highqualityadmin@gmail.com';
    const validPassword = password === 'highqualityadmin12345';

    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address or password' },
        { status: 401 }
      );
    }

    // Set auth session token cookie
    const token = `admin-token-${Date.now()}`;
    const response = NextResponse.json({
      success: true,
      message: 'Admin login successful',
      token
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete('admin_token');
  return response;
}
