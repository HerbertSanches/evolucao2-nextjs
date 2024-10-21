import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';

export interface EmpresaOption {
    ep_id: number;
    ep_nomerao: string;
    ep_nomefantasia: string;
}

interface ComboBoxProps {
    options: EmpresaOption[];
    onChange: (value: number) => void;
    tipoComboBox: string;
}

// Definir o tipo da opção usada pelo react-select
interface OptionType {
    value: number;
    label: JSX.Element;
}

// Função para gerar estilos customizados com base no tipoComboBox
const getCustomStyles = (tipoComboBox: string): StylesConfig<OptionType, false> => ({
    control: (provided, state) => ({
        ...provided,
        backgroundColor: tipoComboBox === 'header' ? '#11121E' : '#ffffff', // Define a cor de fundo
        color: '#ffffff', // Define a cor do texto para garantir contraste
        borderColor: 'transparent', // Estilo da borda ao focar
        boxShadow: state.isFocused ? '0 0 0 1px #000000' : undefined,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#8ab7fa' : state.isSelected ? '#ffffff' : undefined,
        color: state.isSelected ? '#000000' : '#000000',
        padding: 20,
        '&:hover': {
            backgroundColor: '#4a90e2', 
            borderColor: '#11121E', // Borda mais escura ao passar o mouse
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#ffffff', // Cor do texto para o valor selecionado
    }),
    placeholder: (provided) => ({
        ...provided,
        ...(tipoComboBox === 'header' && {
            color: '#ffffff', // Cor do texto do placeholder
            fontFamily: 'Inter',
            fontWeight: 'regular',
            fontSize: '1rem', // Tamanho de fonte padrão para telas menores
        '@media (min-width: 600px)': { // Sm: 640px (telas pequenas e acima)
            fontSize: '1.125rem', // Aumenta para 18px
        },
        '@media (min-width: 1024px)': { // Lg: 1024px (telas grandes e acima)
            fontSize: '1.25rem', // Aumenta para 20px
        },
           
        }),
    }),
    
});


const ComboBox: React.FC<ComboBoxProps> = ({ options, onChange, tipoComboBox }) => {

    if (!Array.isArray(options)) {
        console.error('ComboBox espera um array para options, recebido:', options);
        return null; // Renderiza nada se options não for um array
    }

    const handleChange = (option: OptionType | null) => {
        if (option) {
            onChange(option.value); // Notifica o componente pai
            console.log(option.value);
        }
    };

    const formattedOptions = options.map(option => ({
        value: option.ep_id,
        label: (
            <div className='text-azulEscuro '>
                <div>{option.ep_nomefantasia}</div>
            </div>
        )
    }));

    const defaultOption = formattedOptions.length > 0 ? formattedOptions[0] : undefined;

    const placeholderText = tipoComboBox === 'login' ? "Escolha uma opção" : defaultOption?.label.props.children.props.children;

    return (
        <div className={`max-w-72 ${tipoComboBox === 'header' ? 'whitespace-nowrap text-clip tablet:max-w-44 laptop:max-w-72' : ''}`}>
            <Select<OptionType, false>
                onChange={handleChange}
                options={formattedOptions}
                styles={getCustomStyles(tipoComboBox)} // Passa o tipoComboBox para gerar os estilos
                isSearchable={false}
                placeholder={placeholderText}
            />
        </div>
    );
};

export { ComboBox };
