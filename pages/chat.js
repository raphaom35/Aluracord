import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React,{useEffect} from "react";
import appConfig from "../config.json";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useRouter} from 'next/router'
import { createClient } from '@supabase/supabase-js'
import {ButtonSendSticker} from '../src/componets/ButtonSendSticker'
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM3MzgyOSwiZXhwIjoxOTU4OTQ5ODI5fQ.h5vFEs7Z17TAg8qA6c3kFNP1Ug9lzn2Cy0Ps2Zn5CRI';
const SUPABASE_URL='https://azqkwkrfmtjwwbbynyxq.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage(props) {
    const router = useRouter()
    const [user,setUser] = React.useState({});
    const [isloading,setIsloading] = React.useState(false);
  const [mensagem, setMensagem] = React.useState("");
  const [listDeMessages, setListDeMessages] = React.useState([
    {
      id:0,
      de:'raphaom35',
      texto:':sticker:https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif'
    }
  ]);
  const listDeMessagesNew= [];
  useEffect(()=>{
    // fetch(`https://api.github.com/users/${router.query.username}`)
    // .then(response => response.json())
    // .then(response => {
    //     setUser(response);
    //     console.log(user);
    // })
  })
  const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
    console.log('Nova mensagem:', novaMensagem);
    console.log('listaDeMensagens:', listaDeMensagens);
    // Quero reusar um valor de referencia (objeto/array) 
    // Passar uma função pro setState

    // setListaDeMensagens([
    //     novaMensagem,
    //     ...listaDeMensagens
    // ])
    setListaDeMensagens((valorAtualDaLista) => {
      console.log('valorAtualDaLista:', valorAtualDaLista);
      return [
        novaMensagem,
        ...valorAtualDaLista,
      ]
    });
  });
  useEffect(() => {
    supabaseClient
    .from('mensangens')
    .select('*')
    .order('id',{ascending:false})
    .then(({data}) => {
      if(data!=null){
    setIsloading(true);
    
    data.map((mensage)=>{
      console.log(data);
        const mensagem = {
          id: mensage.id,
          de: mensage.de,
          texto: mensage.texto,
          date: mensage.created_at,
          url: `https://github.com/${mensage.de}.png`
        };
        
        listDeMessagesNew.push(mensagem);
        
      })
      setListDeMessages(listDeMessagesNew);
      }
    });
    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log('Nova mensagem:', novaMensagem);
      console.log('listaDeMensagens:', listaDeMensagens);
      const mensagem = {
        id: novaMensagem.id,
        de: novaMensagem.de,
        texto: mennovaMensagemsage.texto,
        date: novaMensagem.created_at,
        url: `https://github.com/${mensage.de}.png`
      };
      setListaDeMensagens((valorAtualDaLista) => {
        console.log('valorAtualDaLista:', valorAtualDaLista);
        return [
          mensagem,
          ...valorAtualDaLista,
        ]
      });
    });
    
    setIsloading(false);
  
  }, [])

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listDeMessages.length + 1,
      de: user.login,
      texto: novaMensagem,
    };
     supabaseClient
     .from('mensangens')
     .insert([
       mensagem
     ]).then(({data}) => {
       console.log('Mensagem inserida com sucesso');
    
     })
    
    setMensagem("");
  }
  async function handleDeletaMensagem(mensagem){
    await supabaseClient
     .from('mensangens')
     .delete()
     .match({ id: mensagem.id })
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

                color: appConfig.theme.colors.neutrals["000"],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker)=>{
                handleNovaMensagem(`:sticker:${sticker}`)
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
                src={`${mensagem.url}`}
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
                {new Date(mensagem.date).toLocaleString()}
              </Text>

              <FontAwesomeIcon 
                    icon={faTimesCircle} 
                    color="red"
                    style={{display: 'flex',justifyContent: 'flex-end',float: 'right',marginTop: '-5px',marginRight: '-5px'}}
                    onClick={()=>{props.delete(mensagem)}}
                />

            </Box>
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />
              )
              : (
                mensagem.texto
              )}
          </Text>
        );
      })}
    </Box>
  );
}
