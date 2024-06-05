import { NextResponse } from "next/server";

export function errorResponse(error?: Error, errorMessage?:string,  status?: number) {
  if(error?.message === "Unauthorized"){
    return new NextResponse(JSON.stringify({
      success: false,
      message: error?.message,
    }), {
      status:403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }else if(error?.message === "Missing Authorization Token"){
    return new NextResponse(JSON.stringify({
      success: false,
      message: error?.message,
    }), {
      status:401,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }else if(error?.message === "Invalid Authorization Token"){
    return new NextResponse(JSON.stringify({
      success: false,
      message: error?.message,
    }), {
      status:400,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }else if(status && errorMessage){
    return new NextResponse(JSON.stringify({
      success: false,
      message: errorMessage,
    }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }else{
    return new NextResponse(JSON.stringify({
      success: false,
      message: error?.message,
    }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  }