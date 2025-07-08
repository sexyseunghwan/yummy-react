
export function handleError(context: string) {
  return (err: unknown) => {
    console.error(`${context} 실패`, err);
    /* 여기에 toast/error 알림도 가능 */ 
  };
}