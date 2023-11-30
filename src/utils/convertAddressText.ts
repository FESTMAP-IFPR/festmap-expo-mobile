import { AddressData } from "../interfaces/interfaces";

export const convertAddressText = (endereco: AddressData | undefined) => {
  if (!endereco) {
    return "";
  }
  let addressText = "";

  if (endereco?.cep) {
    addressText += endereco?.cep;
  }

  if (endereco?.rua) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.rua;
  }

  if (endereco?.numero) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.numero;
  }

  if (endereco?.bairro) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.bairro;
  }

  if (endereco?.cidade) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.cidade;
  }

  if (endereco?.estado) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.estado;
  }

  if (endereco?.pais) {
    if (addressText) {
      addressText += ", ";
    }
    addressText += endereco?.pais;
  }

  return addressText;
};
