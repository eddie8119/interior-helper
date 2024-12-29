import Link from 'next/link'
import Image from 'next/image'

interface LogoAreaProps {
  width?: number
  height?: number
}

export function LogoArea({ width = 40, height = 40 }: LogoAreaProps) {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        width={width}
        height={height}
        alt="logo"
        priority
      />
      <span className="ml-1 font-semibold text-foreground">DesignerHelper</span>
    </Link>
  )
}
