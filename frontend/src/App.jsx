import Header from "./components/Header.jsx";
import CardList from "./components/CardList.jsx";
import Update from "./components/Update.jsx";
import Add from "./components/AddPopUp.jsx";
import {useEffect, useState} from "react";

function App() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await fetch('http://localhost:8080/characters');
                const data = await res.json();
                setCharacters(data);
            } catch (error) {
                console.error("Erreur de chargement :", error);
            }
        };

        fetchCharacters();
    }, []);
    const handleCharacterAdded = (newChar) => {
        setCharacters((prev) => [...prev, newChar]);
    };

    const handleCharacterUpdated = (updatedChar) => {
        setCharacters((prev) =>
            prev.map((char) => (char.id === updatedChar.id ? updatedChar : char))
        );
        setSelectedCharacter(null);
    };

    const handleCharacterDeleted = (id) => {
        setCharacters((prev) => prev.filter((char) => char.id !== id));
    };

    const handleEditClick = (character) => {
        setSelectedCharacter(character);
        setIsUpdateOpen(true);
    };
    return (
        <>
            <Header/>
            <CardList
                characters={characters}
                onDelete={handleCharacterDeleted}
                onEdit={handleEditClick}
            />
            <Add
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                onAdd={handleCharacterAdded}
            />
            <Update
                isOpen={isUpdateOpen}
                setIsOpen={setIsUpdateOpen}
                character={selectedCharacter}
                onUpdate={handleCharacterUpdated}
                clearSelected={() => setSelectedCharacter(null)}
            />
        </>
    )
}

export default App