import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface IProps{
    moedas: IMoedas[],
    moedaSelecionada: IMoedas | undefined,
    onChange: (moeda: IMoedas)=>void
}

export default function PickerItem({moedas, moedaSelecionada, onChange}:IProps){

    let moedasItem = moedas.map((moeda:IMoedas)=>(
        <Picker.Item key={moeda.key} value={moeda.value} label={moeda.label}/>
    )) 

    return(
        <Picker 
            selectedValue={moedaSelecionada?.value}
            onValueChange={(valor) => {
                const moedaSelec = moedas.find((moeda) => moeda.value === valor);
                if (moedaSelec) {
                    onChange(moedaSelec); 
                }
            }} 
        >
            {moedasItem}
        </Picker>
    )
}