const Icon = () => {
  return (
    <svg
      style={{ width: '1em', height: '1em', fontSize: 'inherit' }}
      stroke='currentColor'
      fill='currentColor'
      stroke-width='0'
      viewBox='0 0 24 24'
      height='200px'
      width='200px'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#790972' />
          <stop offset='50%' stop-color='#d2236e' />
        </linearGradient>
      </defs>
      <path fill='none' d='M0 0h24v24H0z'></path>
      <path fill='url(#gradient)' d='M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z'></path>
    </svg>
  )
}

export default Icon
