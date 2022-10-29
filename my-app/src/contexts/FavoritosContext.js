import { createContext, useState } from "react";

const FavoritosContext = createContext();

export default FavoritosContext;


export const FavoritosProvider = ({ children }) => {
const [listaDeFavoritos, setListaDeFavoritos] = useState([]);

const agregarAFavoritos = (itemNuevo) => {
    console.log('agregarAFavoritos: ', itemNuevo);
    const yaEstaEnFavoritos = listaDeFavoritos.some((item) => item.id === itemNuevo.id);
    if (yaEstaEnFavoritos) {
    
      alert('Este producto ya esta en tu lista de favoritos'); // NO USAR ALERT EN LA PF (proyecto final)
    return;
    } else {
    
    setListaDeFavoritos([...listaDeFavoritos, itemNuevo]);
    }
}

return (
    <FavoritosContext.Provider value={{listaDeFavoritos, agregarAFavoritos}}>
{children}
    </FavoritosContext.Provider>
)
}