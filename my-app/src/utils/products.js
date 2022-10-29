import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

export const getAllProducts = () => {
const database = getFirestore();
const collectionReference = collection(database, 'items');

return getDocs(collectionReference)
    .then(snapshot => {
    const list = snapshot
        .docs
        .map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    return list;
    })
    .catch(error => console.warn(error))
};

export const getProduct = (id) => {
const database = getFirestore();
const itemReference = doc(database, 'items', id);
return getDoc(itemReference)
    .then(snapshot => {
    if(snapshot.exists()) {
        const item = {
        id: snapshot.id,
        ...snapshot.data()
        };
        return item;
    }
    })

};

export const getProductsByCategory = (categoryId) => {

const database = getFirestore();

const collectionReference = collection(database, 'items');

const collectionQuery = query(collectionReference, where('category', '==', categoryId))

return getDocs(collectionQuery)
    .then(snapshot => {
    if (snapshot.size === 0)
        return [];
    
    const list = snapshot
        .docs
        .map((doc) => ({
        id: doc.id,
        ...doc.data()
        }));
    return list;
    })
    .catch(error => console.warn(error))
};

const products = [
{ title:'hamburguesa', category: 'carne', description:'Hamburguesa Yakee', price: 100, pictureUrl: 'https://scontent.ftuc4-1.fna.fbcdn.net/v/t39.30808-6/216540875_5772583826145667_177747134171112315_n.jpg?stp=dst-jpg_p960x960&_nc_cat=100&ccb=1-7&_nc_sid=36a2c1&_nc_ohc=j2FBlvg8bDMAX_i7-Fu&_nc_ht=scontent.ftuc4-1.fna&oh=00_AfATvTtNWwkQ9ZYO2KBNp4Yeyob1ilD839O6_H2I7St6OQ&oe=6361E9C0', stock: 10},
{ title:'ensalada', category: 'vegetariana', description:'Ensalada Cesar', price: 100, pictureUrl: 'https://www.hogarmania.com/archivos/201606/5800-2-ensalada-de-rucula-cherrys-y-queso-xl-668x400x80xX.jpg', stock: 10},
{ title:'empanadas', category: 'carne', description:'Empanada de Carne', price: 100, pictureUrl: 'https://img-global.cpcdn.com/recipes/07560d4a8e3287c7/640x640sq70/photo.webp', stock: 12}
]

export const createAllProducts = async () => {
try {

    const database = getFirestore(); 

    const collectionReference = collection(database, 'items');
    for(let i = 0; i < products.length; i++) {
    const snapshot = await addDoc(collectionReference, products[i]);
    }
} catch (error) {
    console.warn(error)
}
}