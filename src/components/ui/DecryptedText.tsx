import React, { useState, useEffect } from 'react'

interface DecryptedTextProps {
  text: string
  className?: string
  interval?: number
  revealDuration?: number
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  className = '', 
  interval = 50,
  revealDuration = 2000 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isDecrypting, setIsDecrypting] = useState(false)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  const generateRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)]
  }

  const decryptText = () => {
    setIsDecrypting(true)
    let iteration = 0
    const maxIterations = Math.ceil(revealDuration / interval)

    const decryptInterval = setInterval(() => {
      setDisplayText(() => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            const revealPoint = (iteration / maxIterations) * text.length
            
            if (index < revealPoint) {
              return text[index]
            }
            
            return generateRandomChar()
          })
          .join('')
      )

      iteration++

      if (iteration >= maxIterations) {
        clearInterval(decryptInterval)
        setDisplayText(text)
        setIsDecrypting(false)
      }
    }, interval)
  }

  useEffect(() => {
    // Start with random characters
    setDisplayText(
      text
        .split('')
        .map(char => char === ' ' ? ' ' : generateRandomChar())
        .join('')
    )

    // Start decryption after a short delay
    const timer = setTimeout(decryptText, 500)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <span 
      className={`font-mono ${className}`}
      style={{
        letterSpacing: '0.1em',
        textShadow: isDecrypting ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
      }}
    >
      {displayText}
    </span>
  )
}

export default DecryptedText
