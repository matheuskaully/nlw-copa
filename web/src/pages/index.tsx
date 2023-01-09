import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo-nlw-copa.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconChecking from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'
import CreateAlert from '../components/CreateAlert'

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event:FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso! O código foi copiado para área de transferência')
  
      setPoolTitle('')
    } catch (err) {
      console.log(err)

      alert('Falha ao criar o bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white text-5xl font-bold">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input className="flex-1 px-6 py-4 rounded text-gray-100 bg-gray-800 border border-gray-600 text-sm" type="text" required name="" id="" placeholder='Qual é o nome do seu bolão?' onChange={event => setPoolTitle(event.target.value)} value={poolTitle} />
          <button className="bg-yellow-500 hover:bg-yellow-300 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase" type="submit">Criar meu bolão</button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        <div className="mt-10 pt-10 border-t border-gray-600 items-center flex justify-between text-gray-100">
          <div className="flex items-center gap-6"><Image src={iconChecking} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6"><Image src={iconChecking} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} quality="100" alt="Dois celulares exibindo uma prévia da aplicação móvel NLW Copa" />
     
      <CreateAlert  />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessesCountReponse, userCountReponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])

  return{
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountReponse.data.count,
      userCount: userCountReponse.data.count
    }
  }
}