import { Switch } from '@headlessui/react'

export default function Toggle(props:any) {

  return (
    <Switch.Group>
      <div className="flex items-center text-sm">
        <p className='w-[80px]'>Crypto</p>
        <Switch
          checked={props.state}
          onChange={props.setState}
          className={`border border-black ${
            props.state ? 'bg-black' : 'bg-white'
          } relative inline-flex h-2 w-[190px] items-center rounded-full`}
        >
          <span
            className={`${
              props.state ? 'translate-x-[176px] bg-white' : 'translate-x-1 bg-black'
            } inline-block z-10 h-3 w-3 border border-black transform rounded-full transition-transform`}
          />
        </Switch>
        <p className='w-[80px] text-right'>Credit Card</p>
      </div>
    </Switch.Group>
  )
}