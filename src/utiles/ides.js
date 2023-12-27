export const saveID = (id, uno, marca) => {
    localStorage.setItem('id', id);
    localStorage.setItem('uno', uno);
    localStorage.setItem('marca', marca);
};

export const getID = () => {
    const id = localStorage.getItem('id');
    const uno = localStorage.getItem('uno');
    return { id, uno };
};


export const eliminarID = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('uno');
};
