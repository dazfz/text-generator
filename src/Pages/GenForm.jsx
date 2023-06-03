import React, { useState } from "react";
import "./Gen.css";
import MTI from "../Components/MTI"; // TextInput (modificado)
import MPB from "../Components/MPB"; // PrimaryButton (modificado)
import MIL from "../Components/MIL"; // InputLabel (modificado)
import MIE from "../Components/MIE"; // InputError (modificado)
import MM from "../Components/MM"; // Modal (modificado)

const GenForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido1: "",
        apellido2: "",
        areas: [""],
        hobbies: [""],
        correo: "",
        telefono: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // cambiar la propiedad que tenga ese nombre
        }));

        setCopied(false);
    };

    const handleAreasChange = (event, index) => {
        const { value } = event.target;
        setFormData((prevFormData) => {
            const areas = [...prevFormData.areas];
            areas[index] = value;
            return {
                ...prevFormData,
                areas,
            };
        });
        setCopied(false);
    };

    const handleHobbiesChange = (event, index) => {
        const { value } = event.target;
        setFormData((prevFormData) => {
            const hobbies = [...prevFormData.hobbies];
            hobbies[index] = value;
            return {
                ...prevFormData,
                hobbies,
            };
        });
        setCopied(false);
    };

    const handleAddAreas = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            areas: [...prevFormData.areas, ""],
        }));
    };

    const handleAddHobby = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            hobbies: [...prevFormData.hobbies, ""],
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    const handleCopy = async () => {
        const par = document.getElementById("generado");
        if (par) {
            const text = par.innerText; // extraer el texto
            try {
                await navigator.clipboard.writeText(text); // copiar al portapapeles
                setCopied(true);
            } catch (error) {}
        }
    };

    // evito usar formData.prop
    const { nombre, apellido1, apellido2, areas, hobbies, correo, telefono } =
        formData;

    // Texto areas y hobbies, separados por coma y el ultimo con una y
    const hobbiesText = hobbies.join(", ");
    const areasText = areas.join(", ");

    let hobbiesDisplay = hobbiesText;
    if (hobbies.length > 1) {
        const lastIndex = hobbies.length - 1;
        // subarreglo excepto el ultimo elem, se unen con comas, luego hay una "y" y finalmente el ultimo elem
        hobbiesDisplay = `${hobbies.slice(0, lastIndex).join(", ")} y ${
            hobbies[lastIndex]
        }`;
    }

    let areasDisplay = areasText;
    if (areas.length > 1) {
        const lastIndex = areas.length - 1;
        areasDisplay = `${areas.slice(0, lastIndex).join(", ")} y ${
            areas[lastIndex]
        }`;
    }

    return (
        <div>
            <header>
                <h3 className="font-semibold text-2xl text-gray-800 leading-tight">
                    Presentación personal
                </h3>
                <h4 className="text-xl text-gray-400 py-1">
                    Completa tus datos personales para rellenar automáticamente
                    el texto.
                </h4>
            </header>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 flex-wrap"
            >
                <fieldset className="hor-inputs">
                    <div>
                        <MIL htmlFor="nombre">Nombre</MIL>
                        <MTI
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleInputChange}
                            required
                            placeholder="Pedrito"
                        />
                        <MIE message={nombre.trim() === ""} />
                    </div>
                    <div>
                        <MIL htmlFor="apellido1">Primer Apellido</MIL>
                        <MTI
                            type="text"
                            id="apellido1"
                            name="apellido1"
                            value={apellido1}
                            onChange={handleInputChange}
                            required
                            placeholder="Rodríguez"
                        />
                        <MIE message={apellido1.trim() === ""} />
                    </div>
                    <div>
                        <MIL htmlFor="apellido2">Segundo Apellido</MIL>
                        <MTI
                            type="text"
                            id="apellido2"
                            name="apellido2"
                            value={apellido2}
                            onChange={handleInputChange}
                            required
                            placeholder="Pérez"
                        />
                        <MIE message={apellido2.trim() === ""} />
                    </div>
                </fieldset>
                <fieldset>
                    <MIL>Áreas de Interés laboral</MIL>
                    {areas.map((valor, index) => (
                        <div key={index} className="py-1">
                            <MTI
                                type="text"
                                value={valor}
                                onChange={(event) =>
                                    handleAreasChange(event, index)
                                }
                                required
                                placeholder={`Áreas de Interés #${index + 1}`}
                            />
                            <MIE message={valor.trim() === ""} />
                        </div>
                    ))}
                    <MPB
                        type="button"
                        onClick={handleAddAreas}
                        className="bg-violet-800 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-900"
                    >
                        Añadir otra
                    </MPB>
                </fieldset>
                <fieldset>
                    <MIL>Hobbies</MIL>
                    {hobbies.map((valor, index) => (
                        <div key={index} className="py-2">
                            <MTI
                                type="text"
                                value={valor}
                                onChange={(event) =>
                                    handleHobbiesChange(event, index)
                                }
                                required
                                placeholder={`Hobby #${index + 1}`}
                            />
                            <MIE message={valor.trim() === ""} />
                        </div>
                    ))}
                    <MPB
                        type="button"
                        onClick={handleAddHobby}
                        className="bg-violet-800 hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-900"
                    >
                        Añadir otro
                    </MPB>
                </fieldset>
                <fieldset className="hor-inputs">
                    <div>
                        <MIL htmlFor="correo">Correo electrónico</MIL>
                        <MTI
                            type="email"
                            id="correo"
                            name="correo"
                            value={correo}
                            onChange={handleInputChange}
                            required
                            placeholder="correo@ejemplo.cl"
                        />
                        <MIE message={correo.trim() === ""} />
                    </div>
                    <div>
                        <MIL htmlFor="telefono">Número de teléfono</MIL>
                        <MTI
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={telefono}
                            onChange={handleInputChange}
                            required
                            placeholder="987654321"
                        />
                        <MIE message={telefono.trim() === ""} />
                    </div>
                </fieldset>
                <MPB
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-400 focus:bg-teal-400 active:bg-teal-600 mx-auto"
                >
                    Generar texto
                </MPB>
            </form>

            {/* MODAL */}
            <MM show={showModal} onClose={() => setShowModal(false)}>
                <header className="flex justify-between p-3">
                    <h3 className="font-bold leading-tight">
                        Presentación personal
                    </h3>
                    <span onClick={() => setShowModal(false)}>x</span>
                </header>
                <hr></hr>
                <p id="generado" className="text-gray-600 p-3">
                    ¡Hola! soy <strong>{nombre}</strong>{" "}
                    <strong>{apellido1}</strong> <strong>{apellido2}</strong>.
                    Me apasiona el aprendizaje y siempre busco nuevos desafíos.
                    Disfruto de colaborar en equipo, comunicarme eficazmente y
                    encontrar soluciones creativas. Además de mi curiosidad, me
                    interesa [el/la] <strong>{areasDisplay}</strong>. Creo en el
                    impacto positivo y en apliar mis habilidades en proyectos
                    significativos. Fuera del trabajo, disfruto [el/la]{" "}
                    <strong>{hobbiesDisplay}</strong>. Soy una persona
                    apasionada, curiosa y orientada a resultados, lista para
                    enfrentar nuevos retos con entusiasmo. Puedes contactarme a
                    traves de <strong>{correo}</strong> o por teléfono al{" "}
                    <strong>{telefono}</strong>. ¡Espero conocerte pronto!
                </p>
                <hr></hr>
                <footer className="flex justify-end items-end gap-2 p-3">
                    <MPB
                        onClick={() => setShowModal(false)}
                        className="bg-zinc-400 hover:bg-zinc-300 focus:bg-zinc-300 active:bg-zinc-500"
                    >
                        Cerrar
                    </MPB>
                    <MPB
                        onClick={handleCopy}
                        className="bg-teal-500 hover:bg-teal-400 focus:bg-teal-400 active:bg-teal-600"
                    >
                        {copied ? "Copiado!" : "Copiar"}
                    </MPB>
                </footer>
            </MM>
        </div>
    );
};

export default GenForm;
