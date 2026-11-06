
import { NextResponse } from "next/server";

// =====================================================
// ตรวจสอบและอ่าน JSON Body
// =====================================================
async function readJsonBody(request) {
  try {
    const body = await request.json();

    if (
      body === null ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return {
        success: false,
        message: "ข้อมูลต้องเป็น JSON Object",
      };
    }

    return {
      success: true,
      data: body,
    };
  } catch (error) {
    return {
      success: false,
      message: "กรุณาส่ง Request Body ในรูปแบบ JSON ที่ถูกต้อง",
    };
  }
}

// =====================================================
// GET /api/users/[id]
// ดึงข้อมูลผู้ใช้ตาม ID
// =====================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log({
      success: true,
      message: `ดึงข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: `ดึงข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
        data: { id },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/users/[id]
// เพิ่มข้อมูลผู้ใช้
// =====================================================
export async function POST(request, { params }) {
  try {
    const { id } = await params;

    const result = await readJsonBody(request);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          status: 400,
        },
        { status: 400 }
      );
    }

    const body = result.data;

    console.log({
      success: true,
      message: `สร้างข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      data: body,
      status: 201,
    });

    return NextResponse.json(
      {
        success: true,
        message: `สร้างข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
        data: {
          id,
          ...body,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error
          ? error.message
          : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// PUT /api/users/[id]
// แก้ไขข้อมูลผู้ใช้
// =====================================================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const result = await readJsonBody(request);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          status: 400,
        },
        { status: 400 }
      );
    }

    const body = result.data;

    console.log({
      success: true,
      message: `อัปเดตข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      data: body,
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        data: {
          id,
          ...body,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error
          ? error.message
          : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/users/[id]
// ลบข้อมูลผู้ใช้
// =====================================================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    console.log({
      success: true,
      message: `ลบข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`,
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error
          ? error.message
          : "Internal Server Error",
      },
      { status: 500 } //
    );
  }
}
