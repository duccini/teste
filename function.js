import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderNavigation from "../../components/HeaderNavigation";

import axios from "axios";
const baseUrl = "http://147.79.111.150:3001";

import { CadastroContext } from "../../redux/cadastro-context";
import SimpleButton from "../../components/SimpleButton";

import styles from "./styles";

const CadCodigo = () => {
  const [inputValues, setInputValues] = useState({
    digito1: "",
    digito2: "",
    digito3: "",
    digito4: "",
    digito5: "",
    digito6: "",
  });

  // const navigation = useNavigation();

  const cadastroCtx = useContext(CadastroContext);

  const { nome, nasc, genero, sexo, perfil, senha, email, emailCodigo, token } =
    cadastroCtx;

  function inputChangedHandler(inputIdentifier, textEntered) {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: textEntered,
      };
    });
  }

  const handleCadCodigo = async () => {
    const codigoDigitado = Number(
      inputValues.digito1 +
        inputValues.digito2 +
        inputValues.digito3 +
        inputValues.digito4 +
        inputValues.digito5 +
        inputValues.digito6
    );

    if (emailCodigo === codigoDigitado) {
      // try {
      const filename = perfil.uri.substring(
        perfil.uri.lastIndexOf("/") + 1,
        perfil.uri.length
      );

      const extend = filename.split(".");

      const formData = new FormData();
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: perfil.uri,
            type: "image/" + extend[1],
          })
        )
      );

      const nomes = nome.split(" ");

      formData.append("nome", nomes[0]);
      formData.append("sobrenome", nomes[1]);
      formData.append("email", email);
      formData.append("senha", senha);
      formData.append("sexo", sexo);
      formData.append("genero", genero);
      formData.append("nasc", String(nasc));

      headers = { authorization: `Bearer ${token}` };

      const { data } = await axios.post(`${baseUrl}/users/`, formData, headers);

      console.log(data);
     
    } else {
      console.log("codigo errado");
    }
  };

  return (
    <View style={styles.cadCodigoContainer}>
      <HeaderNavigation retornar={true} />

      <View style={styles.cadCodigoContent}>
        <Text style={styles.text}>
          Finalize seu cadastro confirmando o código
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputItem}>
            <View style={styles.inputCodigo}>
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito1")}
                style={styles.codigoItem}
              />
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito2")}
                style={styles.codigoItem}
              />
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito3")}
                style={styles.codigoItem}
              />
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito4")}
                style={styles.codigoItem}
              />
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito5")}
                style={styles.codigoItem}
              />
              <TextInput
                onChangeText={inputChangedHandler.bind(this, "digito6")}
                style={styles.codigoItem}
              />
            </View>

            <Text style={styles.inputInfo}>
              Insira acima o código enviado para o e-mail gui*******@gmail.com
            </Text>

            <View>
              <Text style={styles.textTimer}>1:59</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={handleCadCodigo} style={styles.buttonComponent}>
          <SimpleButton
            buttonType="primaryButton"
            textColor="whiteText"
            // goTo="CadBoasVindas"
            disable={false}
          >
            Continuar
          </SimpleButton>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(CadCodigo);
