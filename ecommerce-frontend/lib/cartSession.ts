export function getCartSessionId(){
    if(typeof window === "undefined"){
        return null;
    }
    return localStorage.getItem("cart_session_id");
}