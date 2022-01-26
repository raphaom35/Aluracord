import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React,{useEffect} from "react";
import appConfig from "../config.json";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRouter} from 'next/router'
export default function ChatPage(props) {
    const router = useRouter()
    const [user,setUser] = React.useState({});
  const [mensagem, setMensagem] = React.useState("");
  const [listDeMessages, setListDeMessages] = React.useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${router.query.username}`)
    .then(response => response.json())
    .then(response => {
        setUser(response);
        console.log(user);
    })
  }, [])
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listDeMessages.length + 1,
      de: user.name,
      texto: novaMensagem,
      date: new Date().toLocaleString(),
      url: user.html_url
    };
    setListDeMessages([mensagem, ...listDeMessages]);
    setMensagem("");
  }
  function handleDeletaMensagem(mensagem){
    setListDeMessages(listDeMessages.filter(item => item.id !== mensagem.id));
  }
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://c.tenor.com/776_3Fjh250AAAAd/paris-saint-germain-psg.gifg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "rgba(0, 0, 118, 0.75);",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: "rgba(0, 0, 85, 0.75)",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listDeMessages} delete={handleDeletaMensagem}/>
          {/* {listDeMessages.map((mensagem)=>{
                        return(
                            <li key={mensagem.id}>
                                {mensagem.texto}
                            </li>
                        )
                   
                     })
                     } */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                borderColor: "#fff",
                border: "1px solid",
                padding: "6px 8px",
                marginRight: "12px",

                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => {handleNovaMensagem(mensagem)}}
              label="Enviar"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: "rgba(182, 0, 0, 2);",
                mainColorLight: "rgba(230, 0, 0, 2);",
                mainColorStrong: "rgba(150, 0, 0, 2);",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: "rgba(0, 0, 60, 0.75)",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
               
              <Image
                styleSheet={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`${mensagem.url}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {mensagem.date}
              </Text>

              <FontAwesomeIcon 
                    icon={faTimesCircle} 
                    color="red"
                    style={{display: 'flex',justifyContent: 'flex-end',float: 'right',marginTop: '-5px',marginRight: '-5px'}}
                    onClick={()=>{props.delete(mensagem)}}
                />

            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
