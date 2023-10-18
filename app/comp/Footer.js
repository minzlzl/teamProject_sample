import React from 'react'
import '../globals.scss'
import Link from 'next/link'

export default function Footer() {
  return (
    <section className='footer'>
        <div>
            <figure>
                <Link href="/pages/dex/list"><img src="/img/mecon_1.png" alt="" /></Link> 
                <Link href="/pages/member/mydigimon"><img src="/img/mecon_2.png" alt="" /></Link> 
                <Link href="/pages/main"><img src="/img/mecon_3.png" alt="" /></Link> 
                <Link href="/pages/borad/list"><img src="/img/mecon_4.png" alt="" /></Link> 
                <Link href="/pages/rank"><img src="/img/mecon_5.png" alt="" /></Link> 
            </figure>
        </div>
    </section>
  )
}
