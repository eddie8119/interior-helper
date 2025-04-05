'use client'

import { Project } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/core/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/core/Card'
import { formatDateTime } from '@/lib/format'
import { useProjectFeatures } from '../hooks/useProjectFeatures'
import { useProjectPermissions } from '../hooks/useProjectPermissions'

interface ProjectCardProps {
  project: Project
  onDelete: (id: string) => Promise<void>
  url: string
  features: ReturnType<typeof useProjectFeatures>
  permissions: ReturnType<typeof useProjectPermissions>
}

export function ProjectCard({
  project,
  onDelete,
  url,
  features,
  permissions,
}: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link
            href={`${url}/${project.id}`}
            className="text-lg font-semibold hover:underline"
          >
            {project.title}
          </Link>
          {permissions.isPremiumUser && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(project.id)}
            >
              刪除
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{project.type} 專案</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-muted-foreground text-sm">
          建立於 {formatDateTime(project.created)}
        </div>
        {features.share && (
          <Button variant="outline" size="sm">
            分享
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
