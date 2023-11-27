export default function StampPhoto({ imageUrl }: { imageUrl: string }) {
  return (
    <div className='stamp'>
      <div
        className='inner'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </div>
  )
}
