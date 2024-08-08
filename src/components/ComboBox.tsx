import React from 'react';
import Select, { StylesConfig } from 'react-select';


interface EmpresaOption {
    ep_id: number;
    ep_nomerao: string;
    ep_nomefantasia: string;
}

interface ComboBoxProps {
    options: EmpresaOption[];
    onChange: (value: number) => void;
}

// Definir o tipo da opção usada pelo react-select
interface OptionType {
    value: number;
    label: JSX.Element;
}

// Configurações de estilo customizadas para o Select
const customStyles: StylesConfig<OptionType, false> = {
    // control: (provided) => ({
    //     ...provided,
    //     borderColor: '#cccccc', // Cor da borda do campo Select
    // }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#8ab7fa' : state.isSelected ? '#ffffff' : undefined,
        color: state.isFocused || state.isSelected ? 'white' : 'black',
        padding: 20,
    }),
};

const ComboBox: React.FC<ComboBoxProps> = ({ options, onChange }) => {
    // Adicionar uma verificação para garantir que options é um array
    if (!Array.isArray(options)) {
        console.error('ComboBox espera um array para options, recebido:', options);
        return null;  // Renderiza nada se options não for um array
    }

    const handleChange = (option: any) => {
        onChange(option.value); // Notifica o componente pai
        console.log( option.value)
    };

    // Preparar as opções para o react-select
    const formattedOptions = options.map(option => ({

        value: option.ep_id,
        label: (
            <div className='custom-div'>
                {/* <strong>{option.ep_nomerao}</strong> */}
                <div>{option.ep_nomefantasia}</div>
            </div>
        )
    }));

    return (
        <div className="max-w-xs mx-auto text-red-700">
            <Select<OptionType, false>
                onChange={handleChange}
                options={formattedOptions}
                styles={customStyles}
                isSearchable={false} 
                placeholder="Escolha uma opção"
            />
        </div>
    );
};

export { ComboBox };