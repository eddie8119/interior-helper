'use client'

import { Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { signOutUser } from '@/actions/authActions'

interface UserMenuProps {
  userInfo: { name: string | null; image: string | null } | null
}

export default function UserMenu({ userInfo }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            border: '2px solid var(--main)',
          }}
          alt={userInfo?.name || 'user avatar'}
          src={'/images/user.png'}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <MenuItem disabled>
          <ListItemText>Signed in as {userInfo?.name}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} href="/members/edit">
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await signOutUser()
            handleClose()
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Log out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
