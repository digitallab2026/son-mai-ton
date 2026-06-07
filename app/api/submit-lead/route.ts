import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, surface, area, audience, location } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Họ tên và số điện thoại là bắt buộc." },
        { status: 400 }
      );
    }

    // Google Sheets integration details
    const SPREADSHEET_ID = "1Vr3LodY2JDCjiMDgOVjXvBSzzoxHYRtjLjnD5MW0QkA";
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    let submittedToSheets = false;
    let errorMessage = "";

    // If Google Credentials are provided in env, we append to the Google Sheet using Google Sheets API
    if (serviceAccountEmail && privateKey) {
      try {
        const { google } = await import("googleapis");
        const auth = new google.auth.JWT(
          serviceAccountEmail,
          undefined,
          privateKey.replace(/\\n/g, "\n"),
          ["https://www.googleapis.com/auth/spreadsheets"]
        );

        const sheets = google.sheets({ version: "v4", auth });
        
        // Append lead to sheet 'Sheet1'
        const range = "Sheet1!A:G";
        const values = [
          [
            new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
            name,
            phone,
            surface,
            area,
            audience || "Chưa xác định",
            location || "Chưa xác định"
          ]
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range,
          valueInputOption: "RAW",
          requestBody: { values },
        });

        submittedToSheets = true;
      } catch (sheetsError: any) {
        console.error("Lỗi đồng bộ Google Sheets:", sheetsError);
        errorMessage = sheetsError?.message || "Lỗi API Google Sheets";
      }
    } else {
      console.log("GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY are not configured. Working locally.");
    }

    // Always succeed and return the status, so that the UI can proceed gracefully
    return NextResponse.json({
      success: true,
      message: "Gửi thông tin thành công!",
      submittedToSheets,
      warning: !submittedToSheets ? "Vui lòng cấu hình GOOGLE_SERVICE_ACCOUNT_EMAIL và GOOGLE_PRIVATE_KEY trong setup .env để cập nhật trực tiếp lên Google Sheets." : undefined,
      debugError: errorMessage || undefined
    });

  } catch (error: any) {
    console.error("Lỗi server submit-lead:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi kết nối máy chủ." },
      { status: 500 }
    );
  }
}
