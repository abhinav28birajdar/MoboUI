import { NextResponse } from "next/server";

function disabledResponse() {
    return NextResponse.json(
        {
            error: "This endpoint is disabled in frontend-only mode.",
        },
        { status: 501 }
    );
}

export async function GET() {
    return disabledResponse();
}

export async function POST() {
    return disabledResponse();
}
