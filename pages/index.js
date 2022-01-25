import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import {useState} from 'react';
import {useRouter} from 'next/router'


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function HomePage() {
  const [username,setUsername] = useState('');
  const [image,setImage] = useState(false);
  const [name,setName] = useState(false);
  const roteamento =useRouter('');
  return (
    <>
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: 'url(https://c.tenor.com/776_3Fjh250AAAAd/paris-saint-germain-psg.gifg)',
        backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%', maxWidth: '700px',
          borderRadius: '5px', padding: '32px', margin: '16px',
          borderColor: '#000',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: 'rgba(0, 0, 118, 0.75);',
        }}
      >
        {/* Formulário */}
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();  
            //console.log(username);
            roteamento.push('/chat',{username});
          }}
          styleSheet={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
          }}
        >
          <Titulo tag="h2">Boas vindas de volta!</Titulo>
          <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['000'] }}>
            {appConfig.name}
          </Text>

          <TextField
            fullWidth
            textFieldColors={{
              neutral: {
                textColor: appConfig.theme.colors.neutrals[200],
                mainColor: appConfig.theme.colors.neutrals[900],
                mainColorHighlight: '#fff',
                backgroundColor: appConfig.theme.colors.neutrals[800],
              },
            }}
            value={username}
            onChange={function (event) {
              // Onde ta o valor?
              const valor = event.target.value;
              if(valor.length <= 2){
                setImage(false);
                //console.log(image);
              }else{
                setImage(true);
                // fetch(`https://api.github.com/users/${valor}`)
                // .then(response => response.json())
                // .then(
                //   (result) => {
                //     setName(result.name);
                //   }
                //   );
              }
              
              console.log(valor.length);
              // Trocar o valor da variavel
              // através do React e avise quem precisa
              setUsername(valor);
            }}
          />
          <Button
            type='submit'
            label='Entrar'
            fullWidth
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: 'rgba(182, 0, 0, 2);',
              mainColorLight: 'rgba(230, 0, 0, 2);',
              mainColorStrong: 'rgba(150, 0, 0, 2);',
            }}
          />
        </Box>
        {/* Formulário */}


        {/* Photo Area */}
        <Box
                  styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '200px',
                    padding: '16px',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals[999],
                    borderRadius: '10px',
                    flex: 1,
                    minHeight: '240px',
                  }}
        >

          <Image
            styleSheet={{
              borderRadius: '50%',
              marginBottom: '16px',
            }}
            src={`https://github.com/${username}.png`}
            
          />

          <Text
            variant="body4"
            styleSheet={{
              color: appConfig.theme.colors.neutrals[200],
              backgroundColor: appConfig.theme.colors.neutrals[900],
              padding: '3px 10px',
              borderRadius: '1000px'
            }}
          >
            {username}
          </Text>
        </Box>
        {/* Photo Area */}
      </Box>
    </Box>
  </>
    
    )
}
