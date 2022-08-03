type handleShow = (x: string) => void;

type shohModal = (x: boolean) => void;

type ChildData = {
    Age?: number;
    No?: number;
    Name?: string;
    Role: string;
    Id?: string;
    Address?: string;
    Image?: string;
    Product_id?: number;
    Category?: string;
    Size?: string;
    Color?: string;
    Price?: string;
    Variant?: string;
    Stock?: string;
};

type Close = () => void;

type setLoad = (boolean) => void;

interface Product {
    Id?: number;
    Name?: string;
    Image_path?: string;
    variant?: string[] | object[] | [];
}

interface User {
    name?: string;
    username?: string;
    role?: string;
    age?: number;
}

interface Variant {
    product?: number | string;
    color?: string | number;
    size?: string;
    stock?: string | number = 0;
    price?: string | number;
    category?: string;
    id?: number | string;
}

interface Color {
    Id?: number;
    color?: string;
}

interface Data {
    Shirt: Variant[];
    Pant: Variant[];
    Suit: Variant[];
}
